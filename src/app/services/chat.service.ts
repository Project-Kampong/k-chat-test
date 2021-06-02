import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GetResponse } from '../models/data/api';

interface OptionObject {
  headers: HttpHeaders;
  authorization?: string;
}

interface MessageRequest {
  chatroom_id: string;
  chatmessage_text: string;
  reply_to?: number;
  file_links?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url: string = environment.apiUrl;
  private options: OptionObject = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  /**
   * Get all chatrooms for a user
   * @event GET
   */
  getUserChatrooms(): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(this.url + 'api/chatrooms/me');
  }

  /**
   * Get a particular chatroom
   * @param chatroomId Chatroom ID
   * @event GET
   */
  getChatroom(chatroomId: string): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(this.url + 'api/chatrooms/' + chatroomId);
  }

  /**
   * Post a message to a chatroom
   * @param data Chat Message details
   
  postMessage(data: MessageRequest): Observable<API> {
    return this.httpClient.post<API>(this.url + 'api/chatrooms/messages', data, this.authService.getAuthOptions());
  }
  */
}
