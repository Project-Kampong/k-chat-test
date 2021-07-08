import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomPreviewComponent } from './chatroom-preview.component';

describe('ChatroomPreviewComponent', () => {
  let component: ChatroomPreviewComponent;
  let fixture: ComponentFixture<ChatroomPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
