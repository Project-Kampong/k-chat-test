import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizedEventCardComponent } from './edit-organized-event-card.component';

describe('EditOrganizedEventCardComponent', () => {
  let component: EditOrganizedEventCardComponent;
  let fixture: ComponentFixture<EditOrganizedEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrganizedEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganizedEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
