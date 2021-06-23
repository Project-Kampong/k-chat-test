import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfilePage } from './public-profile-page.component';

describe('PublicProfilePage', () => {
  let component: PublicProfilePage;
  let fixture: ComponentFixture<PublicProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicProfilePage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
