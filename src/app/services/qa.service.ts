import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { CreatQuestionInput, JoinRoomRequest, QuestionRequest, QuestionResponse } from '../models/qa/qa';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';

const CREATE_QUESTION: DocumentNode = gql`
  mutation createQuestion($createQuestionInput: CreateQuestionInput!, $organizedEventId: ID!) {
    createQuestion(createQuestionInput: $createQuestionInput, organizedEventId: $organizedEventId) {
      _id
      questionText
      voteCount
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class QaService {
  constructor(private socket: Socket, private apollo: Apollo) {}

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

  // sendQuestion(question: QuestionRequest) {
  //   this.socket.emit('send-question', question);
  // }

  sendQuestion(question: QuestionRequest) {
    this.socket.emit('send-question', question);
  }

  createQuestion(eventId: string, question: CreatQuestionInput): Observable<unknown> {
    return this.apollo.mutate({
      mutation: CREATE_QUESTION,
      variables: {
        createQuestionInput: question,
        organizedEventId: eventId,
      },
      // refetchQueries: [
      //   {
      //     query: GET_ALL_ORGANIZED_EVENTS_BY_USER,
      //     variables: { _id: organizerId },
      //   },
      // ],
    });
  }
}
