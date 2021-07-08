import { ChatMessage, ChatroomPreview, ChatroomUser } from '../data/chat';

export interface GetUserChatroomsResponse {
  success: boolean;
  data: ChatroomPreview[];
}

export interface GetChatroomResponse {
  success: boolean;
  data: {
    users: ChatroomUser[];
    messages: ChatMessage[];
  };
}

export interface PostChatMessageResponse {
  success: boolean;
  data: ChatMessage;
}
