import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetChatroomResponse } from 'src/app/models/backend-responses/chat';
import { ChatMessage, ChatroomData, ChatroomPreview, ChatroomUser } from 'src/app/models/data/chat';
import { ChatService } from 'src/app/services/chat.service';

interface User {
  nickname: string;
  profile_picture: string;
}

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss'],
})
export class ChatroomWindowComponent implements OnInit, OnChanges, OnDestroy {
  users: { [key: string]: User } = {};
  messages: ChatMessage[] = [];
  subscriptions: Subscription[] = [];
  chatroomData: ChatroomData = <ChatroomData>{};
  constructor(private chatService: ChatService, private messageService: MessageService) {}
  @Input() chatId: string = '';
  @Input() chatroomPreviewData: ChatroomPreview = <ChatroomPreview>{};

  ngOnInit(): void {
    setTimeout(() => this.forceScroll(), 50);
  }

  ngOnChanges(): void {
    if (this.chatId) {
      this.subscriptions.push(
        this.chatService.getChatroom(this.chatId).subscribe(
          (res: GetChatroomResponse) => {
            this.chatroomData = res.data;
            res.data.users.forEach((user: ChatroomUser) => {
              this.users[user.user_id] = {
                nickname: user['nickname'],
                profile_picture: user['profile_picture'],
              };
            });
            this.messages = res.data.messages;
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Oops! Unable to fetch chat data',
              detail: 'Please try again later',
            });
          },
          () => {
            setTimeout(() => this.forceScroll(), 50);
          },
        ),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  sendMessage(e: Event): void {
    e.preventDefault();
    if (e) {
      const message: string = (e.target as HTMLTextAreaElement)?.value;
      if (message.length === 0) {
        return;
      }
      this.chatService
        .postMessage({
          chatroom_id: this.chatId,
          chatmessage_text: message,
        })
        .subscribe(
          (res) => {
            if (res.success) {
              this.messages.push(res['data'] as any);
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            (<HTMLFormElement>document.getElementById('input-form')).reset();
            setTimeout(() => this.updateScroll(), 50);
          },
        );
    }
  }

  updateScroll(): void {
    const window: HTMLElement | null = document.getElementById('window');
    window?.scrollTo({ top: window.scrollHeight, behavior: 'smooth' });
  }

  forceScroll(): void {
    const window: HTMLElement | null = document.getElementById('window');
    window?.scrollTo({ top: window.scrollHeight });
  }
}
