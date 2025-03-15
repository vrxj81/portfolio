import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureRegistrationComponent } from './registration.component';

describe('AuthFeatureRegistrationComponent', () => {
  let component: AuthFeatureRegistrationComponent;
  let fixture: ComponentFixture<AuthFeatureRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
