import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioAuthUiActivateComponentComponent } from './activate.component';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('PortfolioAuthUiActivateComponentComponent', () => {
  let component: PortfolioAuthUiActivateComponentComponent;
  let fixture: ComponentFixture<PortfolioAuthUiActivateComponentComponent>;
  let componentRef: ComponentRef<PortfolioAuthUiActivateComponentComponent>;
  const mockAuthStore = {
    isActivated: of(false),
    isLoading: of(false),
    error: of(null as string | null),
    activate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAuthUiActivateComponentComponent],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PortfolioAuthUiActivateComponentComponent,
    );
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('token', 'test-token');
    componentRef.setInput('id', 'test-userId');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
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
    mockAuthStore.isActivated = of(true);
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const message = fixture.debugElement.query(
        By.css('[data-status="success"]'),
      ).nativeElement;
      expect(message.textContent).toContain('Your account has been activated!');
    });
  });

  it('should display error message when there is an error', () => {
    mockAuthStore.error = of('Error');
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
    mockAuthStore.isLoading = of(true);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const message = fixture.debugElement.query(
        By.css('[data-status="loading"]'),
      ).nativeElement;
      expect(message.textContent).toContain('Activating your account...');
    });
  });
});
