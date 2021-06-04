export interface ChatroomPreview {
  chatroom_id: string;
  chatroom_name: string;
  chatroom_pic: string;
  is_dm: boolean;
  last_seen: string;
  most_recent_msg: ChatMessagePreview;
  nickname: string;
}

export interface ChatMessagePreview {
  chatmessage_text: string;
  created_on: string;
  user_id: string;
}

export interface ChatMessage {
  chatmessage_id: number;
  chatroom_id: string;
  user_id: string;
  chatmessage_text: string;
  reply_to: string;
  file_links: string;
  created_on: string;
  updated_on: string;
}

export interface ChatroomData {
  users: ChatroomUser[];
  messages: ChatMessage[];
}

export interface ChatroomUser {
  user_id: string;
  nickname: string;
  profile_picture: string;
}
