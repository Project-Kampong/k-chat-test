import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { JoinRoomRequest, QuestionRequest } from '../models/qa/qa';

@Injectable({
  providedIn: 'root',
})
export class QaService {
  constructor(private socket: Socket) {}

  onConnect() {
    this.socket.on('connection', (log: any) => {
      console.log(log);
    });
  }

  sendMessage(message: any) {
    this.socket.emit('chat-message', {
      message: message,
      nick: 'userName',
    });
  }

  getMessages() {
    return new Observable((observer) => {
      this.socket.on('chat-message', (message: any) => {
        observer.next(message);
      });
    });
  }

  joinRoom(credentials: JoinRoomRequest) {
    this.socket.emit('join-room', credentials);
    return new Observable((observer) => {
      this.socket.on('notification', (message: any) => {
        observer.next(message);
      });
    });
  }

  sendQuestion(question: QuestionRequest) {
    this.socket.emit('send-question', question);
  }
}
