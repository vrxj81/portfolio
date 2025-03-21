import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IError, IUser } from '@portfolio/common-models';
import { computed, inject } from '@angular/core';
import { AuthService } from '@portfolio/auth-frontend-ng-data-access';
import { Router } from '@angular/router';
import { LoginRequestDto, RegisterRequestDto } from '@portfolio/common-dtos';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { jwtDecode } from 'jwt-decode';
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { AUTH_CONFIG } from '@portfolio/auth-frontend-ng-config';

type AuthState = {
  accessToken: string | null;
  isLoading: boolean;
  isRegistered: boolean;
  isActivated: boolean;
  isForgot: boolean;
  isReset: boolean;
  isRefreshed: boolean;
  selectedId: string | null;
  error: IError | null;
  ability: MongoAbility | null;
};

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
  isRegistered: false,
  isActivated: false,
  isForgot: false,
  isReset: false,
  isRefreshed: false,
  selectedId: null,
  error: null,
  ability: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('Auth'),
  withState(initialState),
  withEntities<IUser>(),
  withProps(() => ({
    config: inject(AUTH_CONFIG),
  })),
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.accessToken),
    user: computed(() => state.entities()[0]),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      register: rxMethod<RegisterRequestDto>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((credentials) =>
            authService.register(credentials).pipe(
              tapResponse({
                next: (response) => {
                  if ('registered' in response) {
                    patchState(store, { isRegistered: response.registered });
                  } else {
                    const { accessToken, refreshToken } = response;
                    const decoded: { user: IUser } = jwtDecode(accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    patchState(
                      store,
                      { accessToken },
                      addEntity(decoded.user),
                      {
                        ability: updateAbilitiesForUser(decoded.user),
                      },
                    );
                    router.navigate([store.config.loginRedirectUrl]);
                  }
                },
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
      login: rxMethod<LoginRequestDto>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((credentials) =>
            authService.login(credentials).pipe(
              tapResponse({
                next: ({ accessToken, refreshToken }) => {
                  const decoded: { user: IUser } = jwtDecode(accessToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  patchState(store, addEntity(decoded.user), {
                    ability: updateAbilitiesForUser(decoded.user),
                  });
                  router.navigate([store.config.loginRedirectUrl]);
                },
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        localStorage.removeItem('refreshToken');
        patchState(
          store,
          { accessToken: null, ability: null },
          removeAllEntities(),
        );
        router.navigate([store.config.logoutRedirectUrl]);
      },
      activate: rxMethod<{ userId: string; token: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ userId, token }) =>
            authService.activate(userId, token).pipe(
              tapResponse({
                next: ({ activated }) =>
                  patchState(store, { isActivated: activated }),
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
      forgotPassword: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((email) =>
            authService.forgotPassword(email).pipe(
              tapResponse({
                next: ({ forgot }) => patchState(store, { isForgot: forgot }),
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
      resetPassword: rxMethod<{ token: string; password: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ token, password }) =>
            authService.resetPassword(token, password).pipe(
              tapResponse({
                next: ({ reset }) => patchState(store, { isReset: reset }),
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
      refreshToken: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((token) =>
            authService.refreshToken(token).pipe(
              tapResponse({
                next: ({ accessToken, refreshToken }) => {
                  const decoded: { user: IUser } = jwtDecode(accessToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  patchState(store, addEntity(decoded.user), {
                    ability: updateAbilitiesForUser(decoded.user),
                    isRefreshed: true,
                  });
                },
                error: (error) => patchState(store, { error: error as IError }),
                finalize: () =>
                  patchState(store, { isLoading: false, isRefreshed: false }),
              }),
            ),
          ),
        ),
      ),
      canActivate: (action: string, subject: string) => {
        return store.ability()?.can(action, subject);
      },
    }),
  ),
);

const updateAbilitiesForUser = (user: IUser): MongoAbility => {
  if (!user.roles) {
    return createMongoAbility([]);
  }
  const permissions = user.roles.map((role) => role.permissions).flat();
  const { can, rules } = new AbilityBuilder(createMongoAbility);
  const ability = createMongoAbility();
  permissions.forEach((permission) => {
    if (permission) {
      const conditions = permission?.conditions
        ? JSON.parse(permission.conditions)
        : undefined;
      can(permission.action, permission.subject, undefined, conditions);
    }
  });
  ability.update(rules);

  return ability;
};
