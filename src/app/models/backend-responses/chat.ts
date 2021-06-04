import { ChatMessage, ChatroomPreview, ChatroomUser } from '../data/chat';

export interface GetUserChatroomsResponse {
  success: true;
  data: ChatroomPreview[];
}

export interface GetChatroomResponse {
  success: true;
  data: {
    users: ChatroomUser[];
    messages: ChatMessage[];
  };
}
