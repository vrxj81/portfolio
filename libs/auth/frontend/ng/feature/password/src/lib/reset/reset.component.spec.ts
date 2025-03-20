import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeaturePasswordResetComponent } from './reset.component';
import { ComponentRef, signal } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { provideRouter } from '@angular/router';

describe('AuthFeaturePasswordResetComponent', () => {
  let component: AuthFeaturePasswordResetComponent;
  let fixture: ComponentFixture<AuthFeaturePasswordResetComponent>;
  let reference: ComponentRef<AuthFeaturePasswordResetComponent>;

  const mockAuthStore = {
    isReset: signal(false),
    isLoading: signal(false),
    error: signal<string | null>(null),
    resetPassword: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeaturePasswordResetComponent],
      providers: [
        { provide: AuthStore, useValue: mockAuthStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeaturePasswordResetComponent);
    component = fixture.componentInstance;
    reference = fixture.componentRef;
    reference.setInput('token', 'test-token');
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call resetPassword on submit', () => {
    component.onSubmit('password');
    expect(mockAuthStore.resetPassword).toHaveBeenCalledWith({
      password: 'password',
      token: 'test-token',
    });
  });
  it('should display a message when isReset is true', async () => {
    mockAuthStore.isReset.set(true);
    await fixture.whenStable();
    const messageElement: HTMLElement = fixture.nativeElement;
    const p = messageElement.querySelector('p');
    expect(p).toBeTruthy();
    expect(p?.textContent).toContain('Your password has been reset.');
  });
  it('should display an error message when error is set', () => {
    mockAuthStore.error.set('test error');
    expect(component.error()).toBe('test error');
  });
  it('should display loading', () => {
    expect(component.isLoading()).toBe(false);
    mockAuthStore.isLoading.set(true);
    expect(component.isLoading()).toBe(true);
  });
});
