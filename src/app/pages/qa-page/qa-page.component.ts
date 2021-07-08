import { Component, OnInit } from '@angular/core';
import { JoinRoomRequest, QuestionRequest, QuestionResponse } from 'src/app/models/qa/qa';
import { QaService } from 'src/app/services/qa.service';

@Component({
  selector: 'app-qa-page',
  templateUrl: './qa-page.component.html',
  styleUrls: ['./qa-page.component.scss'],
})
export class QaPageComponent implements OnInit {
  name: String = '';
  group: String = '';
  joinRoomRequest = {} as JoinRoomRequest;
  questionRequest = {} as QuestionRequest;
  questionsResponse: QuestionResponse[] = [{ roomId: '1', question: 'What is this?' }];

  constructor(private qaService: QaService) {}

  ngOnInit(): void {}

  onSendQuestion() {
    this.questionRequest.roomId = this.joinRoomRequest.roomId;
    this.qaService.sendQuestion(this.questionRequest);
  }

  onJoin() {
    this.qaService.joinRoom(this.joinRoomRequest).subscribe((result: any) => {
      console.log(result);
      if (result.questions) this.questionsResponse = result.questions;
    });
  }
}
