import { Component, Input } from '@angular/core';
import { ChatroomPreview } from 'src/app/models/data/chat';

@Component({
  selector: 'app-chatroom-preview',
  templateUrl: './chatroom-preview.component.html',
  styleUrls: ['./chatroom-preview.component.scss'],
})
export class ChatroomPreviewComponent {
  @Input() routeToChatWindow: Function = () => true;
  @Input() chatroomPreviewData: ChatroomPreview = <ChatroomPreview>{};
}
