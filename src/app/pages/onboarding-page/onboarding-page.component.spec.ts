import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingPage } from './onboarding-page.component';

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
