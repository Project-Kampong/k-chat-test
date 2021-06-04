export interface JoinRoomRequest {
  name: String;
  roomId: String;
}

export interface QuestionRequest {
  roomId: String;
  question: String;
}

export interface QuestionResponse {
  roomId: String;
  question: String;
}
