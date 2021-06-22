import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizedEventCardComponent } from './organized-event-card.component';

describe('OrganizedEventCardComponent', () => {
  let component: OrganizedEventCardComponent;
  let fixture: ComponentFixture<OrganizedEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizedEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizedEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
