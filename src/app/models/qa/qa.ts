export interface JoinRoomRequest {
  name: string;
  roomId: string;
}

export interface QuestionRequest {
  roomId: string;
  question: string;
}

export interface QuestionResponse {
  _id: string;
  questionText: string;
  voteCount: number;
}

export interface CreatQuestionInput {
  userId: string;
  displayName: string;
  questionText: string;
}
