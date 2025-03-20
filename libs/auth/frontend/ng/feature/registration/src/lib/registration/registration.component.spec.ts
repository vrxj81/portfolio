import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureRegistrationComponent } from './registration.component';
import { ComponentRef } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { RegisterRequestDto } from '@portfolio/common-dtos';

describe('AuthFeatureRegistrationComponent', () => {
  let component: AuthFeatureRegistrationComponent;
  let fixture: ComponentFixture<AuthFeatureRegistrationComponent>;
  let reference: ComponentRef<AuthFeatureRegistrationComponent>;

  const mockAuthStore = {
    isRegistered: jest.fn(),
    isLoading: jest.fn(),
    error: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureRegistrationComponent],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureRegistrationComponent);
    component = fixture.componentInstance;
    reference = fixture.componentRef;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call register on onSubmit', () => {
    const registerRequestDto: RegisterRequestDto = {
      email: 'test@example.com',
      password: 'password',
      username: 'test',
      confirmPassword: 'password',
    };
    reference.setInput('role', 'user');
    component.onSubmit(registerRequestDto);
    expect(mockAuthStore.register).toHaveBeenCalledWith({
      ...registerRequestDto,
      role: 'user',
    });
  });

  it('should have isRegistered property', () => {
    expect(component.isRegistered).toBeDefined();
  });

  it('should have isLoading property', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('should have error property', () => {
    expect(component.error).toBeDefined();
  });

  it('should have role property', () => {
    expect(component.role).toBeDefined();
  });
});
