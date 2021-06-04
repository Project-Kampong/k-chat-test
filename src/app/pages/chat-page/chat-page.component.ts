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
  subscriptions: Subscription[] = [];
  chatroomPreviews: ChatroomPreview[] = [];

  constructor(private router: Router, private chatService: ChatService, private messageService: MessageService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.subscriptions.push(
      this.chatService.getUserChatrooms().subscribe(
        (res: GetUserChatroomsResponse) => {
          this.chatroomPreviews = res.data;
          console.log(this.chatroomPreviews);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToHome(): void {
    this.router.navigate(['/home']);
  }
}
