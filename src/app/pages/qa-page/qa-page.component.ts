import { Component, OnInit } from '@angular/core';
import { CreatQuestionInput, JoinRoomRequest, QuestionRequest } from 'src/app/models/qa/qa';
import { AuthService } from 'src/app/services/auth.service';
import { QaService } from 'src/app/services/qa.service';

@Component({
  selector: 'app-qa-page',
  templateUrl: './qa-page.component.html',
  styleUrls: ['./qa-page.component.scss'],
})
export class QaPageComponent implements OnInit {
  name: string = '';
  group: string = '';
  // joinRoomRequest = {} as JoinRoomRequest;
  // questionRequest = {} as QuestionRequest;
  // questionsResponse: QuestionResponse[] = [{ roomId: '1', question: 'What is this?' }];
  question: string = '';
  userName: string = '';
  eventId: string = '60d1742b3580ef0015c3c641';

  constructor(private qaService: QaService, private authService: AuthService) {
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
    console.log('test');
    console.log(this.userName);
  }

  onSendQuestion() {
    // this.questionRequest.roomId = this.joinRoomRequest.roomId;
    // this.qaService.sendQuestion(this.questionRequest);
    let question = {} as CreatQuestionInput;
    question.displayName = this.userName; // unncessary
    question.questionText = this.question;
    question.userId = this.authService.getUserId();
    console.log(question);
    this.qaService.createQuestion(this.eventId, question).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  // onJoin() {
  //   this.qaService.joinRoom(this.joinRoomRequest).subscribe((result: any) => {
  //     console.log(result);
  //     if (result.questions) this.questionsResponse = result.questions;
  //   });
  // }
}
