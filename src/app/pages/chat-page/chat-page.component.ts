import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetUserChatroomsResponse } from 'src/app/models/backend-responses/chat';
import { ChatroomPreview } from 'src/app/models/data/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  selectedChatroomPreview: ChatroomPreview = <ChatroomPreview>{};
  chatId: string = '';
  subscriptions: Subscription[] = [];
  chatroomPreviews: ChatroomPreview[] = [];

  constructor(private router: Router, private chatService: ChatService, private messageService: MessageService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.routeToChatWindow = this.routeToChatWindow.bind(this);
    this.subscriptions.push(
      this.chatService.getUserChatrooms().subscribe(
        (res: GetUserChatroomsResponse) => {
          this.chatroomPreviews = res.data;
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Oops! Something went wrong with the server',
            detail: 'Please try again later',
          });
        },
      ),
    );
  }

  checkWindowSize(): void {
    if (window.screen.width < 768) {
      const chatElement: HTMLElement | null = document.getElementById('chat-div');
      const previewElement: HTMLElement | null = document.getElementById('preview-div');
      if (chatElement && previewElement) {
        if (!chatElement.style.display || chatElement.style.display === 'none') {
          chatElement.style.display = 'block';
          previewElement.style.display = 'none';
        } else {
          chatElement.style.display = 'none';
          previewElement.style.display = 'block';
        }
      }
    }
  }

  routeToChatWindow(chatId: string): void {
    this.chatId = chatId;
    this.router.navigate(['/chat'], {
      queryParams: { id: chatId },
    });
    this.checkWindowSize();
    this.selectedChatroomPreview = this.chatroomPreviews.filter((c) => c.chatroom_id == chatId)[0];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToHome(): void {
    this.router.navigate(['/home']);
  }
}
