import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class InsuranceFormComponent implements OnInit {
  public questionList: any = [];
  public currentQuestionNumber: number = 0;
  public isQuizCompleted = false;
  public textInputVal = '';
  public isAnswered = false;
  public interacted = false;
  public question_type = {
    choice: 'multiple-choice',
    text: 'text',
  };
  public jumpArray: any = [];
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }
  
  getAllQuestions() {
    this.questionList = this.questionService
      .getQuestionJSON()
      .subscribe((response) => {
        if (response.questionnaire) {
          this.questionList = response?.questionnaire?.questions;
        }
      });
  }

  nextQuestion(currentQuestionNumber: number, currentQuestion: any) {
    this.isAnswered = this.checkMandatory(currentQuestion);
    if (!this.isAnswered && currentQuestion.required) {
      //is Mandatory Check
      this.interacted = true;
      return;
    }
    const questionType = currentQuestion.question_type;
    if (
      questionType === this.question_type.choice &&
      currentQuestion.multiple === 'false'
    ) {
      const selectedOption = currentQuestion.choices.find((choice: any) => {
        return choice.selected;
      });

      if (currentQuestion?.jumps.length) {
        const jumpItem = this.getJumpItem(
          currentQuestion?.jumps,
          selectedOption?.value
        );
        if (jumpItem) {
          let jumpIdentifier = jumpItem?.destination?.id;
          const jumpIndex = this.questionList.findIndex(
            (item: any) => item.identifier === jumpIdentifier
          );

          let existInJumpList = this.jumpArray.some((jumpEl: any) => {
            return jumpEl.jumpDestinationIndex === jumpIndex;
          });
          if (!existInJumpList) {
            this.jumpArray.push({
              jumpDestinationIndex: jumpIndex,
              jumpInitiatorIndex: currentQuestionNumber,
            });
          }
          this.currentQuestionNumber = jumpIndex;
          return;
        }
      }
    }

    if (currentQuestionNumber !== this.questionList.length) {
      ++this.currentQuestionNumber;
    } else {
      this.isQuizCompleted = true;
    }
    this.interacted = false;
  }

  previousQuestion(currentQuestion: any) {
    this.isAnswered = this.checkMandatory(currentQuestion);
    if (!this.isAnswered && currentQuestion.required) {
      //is Mandatory Check
      this.interacted = true;
    }
    this.interacted = false;
    let isAnsweredJump = false;
    if (this.jumpArray.length) {
      let jumpInitiator = this.jumpArray.find((element: any) => {
        return element?.jumpDestinationIndex === this.currentQuestionNumber;
      });
      if (jumpInitiator) {
        isAnsweredJump = this.questionList[
          jumpInitiator.jumpInitiatorIndex
        ].choices.some((choice: any) => {
          return choice.selected;
        });
        if (isAnsweredJump) {
          this.currentQuestionNumber = jumpInitiator.jumpInitiatorIndex;
          let removeIndex = this.jumpArray.findIndex((element: any) => {
            return element?.jumpInitiatorIndex === this.currentQuestionNumber;
          });
          if (removeIndex > -1) {
            this.jumpArray.splice(removeIndex, 1);
          }
        }
      } else {
        --this.currentQuestionNumber;
      }
    } else {
      --this.currentQuestionNumber;
    }
  }

  answerQuestion(event: any, currentQuestion: any) {
    const value = event.target.value;
    const questionType = currentQuestion.question_type;
    const isMultiple = currentQuestion.multiple;
    const questionIndex = this.questionList.findIndex(
      (item: any) => item.identifier === currentQuestion.identifier
    );
    if (value && currentQuestion) {
      this.isAnswered = true;
      if (questionType == this.question_type.text) {
        //Type=Text
        this.questionList[questionIndex].value = value;
      } else if (
        questionType === this.question_type.choice &&
        isMultiple === 'false'
      ) {
        //Type=Radio
        let options: any = [];
        let selectedChoice: any = {};
        options = this.questionList[questionIndex].choices;
        options.forEach((element: any) => {
          element.selected = false;
        });
        selectedChoice = options.find((item: any) => item.value === value);
        selectedChoice.selected = true;
      } else if (
        questionType === this.question_type.choice &&
        isMultiple === 'true'
      ) {
        //Type=Checkbox
        let options: any = [];
        let selectedChoice: any = {};
        options = this.questionList[questionIndex].choices;

        selectedChoice = options.find((item: any) => item.value === value);
        selectedChoice.selected = !selectedChoice.selected;
      }
    } else {
      this.isAnswered = false;
    }

    if (!value && questionType == this.question_type.text) {
      //Type=Text
      this.questionList[questionIndex].value = '';
    }
  }

  checkMandatory(currentQuestion: any): boolean {
    let isAnswered = false;
    const questionType = currentQuestion.question_type;
    const questionIndex = this.questionList.findIndex(
      (item: any) => item.identifier === currentQuestion.identifier
    );

    if (questionType == this.question_type.text) {
      //Type=Text
      this.questionList[questionIndex].value.trim().length === 0
        ? (isAnswered = false)
        : (isAnswered = true);
    } else if (questionType === this.question_type.choice) {
      //Type=Radio & Checkbox
      let options: any = [];
      options = this.questionList[questionIndex].choices;
      isAnswered = options.some((item: any) => {
        return item.selected === true;
      });
      isAnswered ? (isAnswered = true) : (isAnswered = false);
    }
    return isAnswered;
  }

  getJumpItem(array: any, passedValue: string): any {
    return array.find((element: any) => {
      return element?.conditions[0].value === passedValue;
    });
  }

  ngOnDestroy(): void {
    this.questionList = [];
    this.interacted = false;
  }
}
