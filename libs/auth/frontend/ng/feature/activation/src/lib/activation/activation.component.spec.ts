import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureActivationComponent } from './activation.component';
import { By } from '@angular/platform-browser';
import { ComponentRef, signal } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { provideRouter } from '@angular/router';

describe('AuthFeatureActivationComponent', () => {
  let component: AuthFeatureActivationComponent;
  let fixture: ComponentFixture<AuthFeatureActivationComponent>;
  let componentRef: ComponentRef<AuthFeatureActivationComponent>;
  const mockAuthStore = {
    isActivated: signal(false),
    isLoading: signal(false),
    error: signal<string | null>(null),
    activate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureActivationComponent],
      providers: [
        { provide: AuthStore, useValue: mockAuthStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureActivationComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('token', 'test-token');
    componentRef.setInput('id', 'test-userId');
    await fixture.whenStable();
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call activate on init', () => {
    fixture.whenStable().then(() => {
      expect(mockAuthStore.activate).toHaveBeenCalledWith({
        userId: 'test-userId',
        token: 'token',
      });
    });
  });

  it('should display activation message when activated', () => {
    mockAuthStore.isActivated.set(true);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const message = fixture.debugElement.query(
        By.css('[data-status="success"]'),
      ).nativeElement;
      expect(message.textContent).toContain('Your account has been activated!');
    });
  });

  it('should display error message when there is an error', () => {
    mockAuthStore.error.set('Error');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const message = fixture.debugElement.query(
        By.css('[data-status="error"]'),
      ).nativeElement;
      expect(message.textContent).toContain(
        'There was an error activating your account',
      );
    });
  });

  it('should display loading message when loading', () => {
    mockAuthStore.isLoading.set(true);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const message = fixture.debugElement.query(
        By.css('[data-status="loading"]'),
      ).nativeElement;
      expect(message.textContent).toContain('Activating your account...');
    });
  });
});
