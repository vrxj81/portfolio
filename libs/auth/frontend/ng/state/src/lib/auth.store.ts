import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IUser } from '@portfolio/common-models';
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

type AuthState = {
  accessToken: string | null;
  isLoading: boolean;
  isRegistered: boolean;
  selectedId: string | null;
  error: string | null;
  ability: MongoAbility | null;
};

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
  isRegistered: false,
  selectedId: null,
  error: null,
  ability: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('Auth'),
  withState(initialState),
  withEntities<IUser>(),
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
                    router.navigate(['/']);
                  }
                },
                error: (error) => patchState(store, { error: error as string }),
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
                },
                error: (error) => patchState(store, { error: error as string }),
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
        router.navigate(['/login']);
      },
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
