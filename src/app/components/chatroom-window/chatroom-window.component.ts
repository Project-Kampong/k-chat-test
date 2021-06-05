import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetChatroomResponse } from 'src/app/models/backend-responses/chat';
import { ChatroomData, ChatroomPreview } from 'src/app/models/data/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss'],
})
export class ChatroomWindowComponent implements OnChanges, OnDestroy {
  subscriptions: Subscription[] = [];
  private chatroomData: ChatroomData = <ChatroomData>{};
  constructor(private chatService: ChatService, private messageService: MessageService) {}
  @Input() chatId: string = '';
  @Input() chatroomPreviewData: ChatroomPreview = <ChatroomPreview>{};

  ngOnChanges(): void {
    if (this.chatId) {
      this.subscriptions.push(
        this.chatService.getChatroom(this.chatId).subscribe(
          (res: GetChatroomResponse) => {
            this.chatroomData = res.data;
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Oops! Unable to fetch chat data',
              detail: 'Please try again later',
            });
          },
        ),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
