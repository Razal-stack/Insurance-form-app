import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public questionList: any = {};
  public question_type = {
    choice: 'multiple-choice',
    text: 'text',
  };

  constructor(private httpClient: HttpClient) {}
  getQuestionJSON() {
    return this.httpClient.get<any>('assets/questions/questionnaire.json');
  }
}
