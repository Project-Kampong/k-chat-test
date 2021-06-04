import { Component, Input } from '@angular/core';
import { ChatroomPreview } from 'src/app/models/data/chat';

@Component({
  selector: 'chatroom-preview',
  templateUrl: './chatroom-preview.component.html',
  styleUrls: ['./chatroom-preview.component.scss'],
})
export class ChatroomPreviewComponent {
  @Input() chatroomPreviewData: ChatroomPreview = <ChatroomPreview>{};
}
