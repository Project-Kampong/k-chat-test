import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventPage } from './edit-event-page.component';

describe('EditEventPage', () => {
  let component: EditEventPage;
  let fixture: ComponentFixture<EditEventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEventPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
