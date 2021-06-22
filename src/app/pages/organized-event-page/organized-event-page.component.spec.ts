import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizedEventPage } from './organized-event-page.component';

describe('OrganizedEventPage', () => {
  let component: OrganizedEventPage;
  let fixture: ComponentFixture<OrganizedEventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizedEventPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizedEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
