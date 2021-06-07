import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:5001/');
  }

  setup(userId: string): void {
    this.socket.on('connected', () => console.log('I am connected'));
  }

  joinChat(chatId: string): void {
    this.socket.emit('join chat', chatId);
  }
}
