import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';
import { QuestionService } from 'src/app/service/question.service';
import { AppConstants } from 'src/app/app.constants';

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
  public isQuizCompleted: boolean = false;
  public textInputVal: String = '';
  public questionText: String = '';
  public multiSelectText: String = '';
  public mandatoryText: String = '';
  public submitButtonText: String = '';
  public placeHolderText: String = '';
  public isAnswered: boolean = false;
  public interacted: boolean = false;
  public question_type = {
    choice: 'multiple-choice',
    text: 'text',
  };
  public jumpArray: any = [];
  constructor(
    private questionService: QuestionService,
    private constants: AppConstants
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.initializeConstants();
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

  initializeConstants() {
    this.questionText = this.constants.questionText;
    this.multiSelectText = this.constants.multiSelectText;
    this.mandatoryText = this.constants.mandatoryText;
    this.submitButtonText = this.constants.submitButtonText;
    this.placeHolderText = this.constants.placeHolderText;
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
          // To get the id of the destination question to jump
          const jumpIndex = this.questionList.findIndex(
            (item: any) => item.identifier === jumpIdentifier
          );
          // To check if the destination question to jump is already present in the Jump Array
          let existInJumpList = this.jumpArray.some((jumpEl: any) => {
            return jumpEl.jumpDestinationIndex === jumpIndex;
          });
          // if the destination question to jump is not added , push it to Jump Array
          if (!existInJumpList) {
            this.jumpArray.push({
              jumpDestinationIndex: jumpIndex,
              jumpInitiatorIndex: currentQuestionNumber,
            });
          }
          // change the question id to the next destination question
          this.currentQuestionNumber = jumpIndex;
          return;
        }
      }
    }

    if (currentQuestionNumber !== this.questionList.length) {
      ++this.currentQuestionNumber;
    }
    this.interacted = false;
  }

  previousQuestion(currentQuestion: any) {
    this.isAnswered = this.checkMandatory(currentQuestion);
    if (!this.isAnswered && currentQuestion.required) {
      // is Mandatory Check
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
          // To remove caller details from the Jump Array, when returned back to caller Question
          this.jumpArray = this.jumpArray.filter((item: any) => {
            return item?.jumpInitiatorIndex !== this.currentQuestionNumber;
          });
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
        // Storing the user input for the text based question
        this.questionList[questionIndex].value = value;
      } else if (
        questionType === this.question_type.choice &&
        isMultiple === 'false'
      ) {
        // Storing the user input for the radio based question
        let options: any = [];
        options = this.questionList[questionIndex].choices;
        options = options.map((item: any) => {
          if (item.value === value) {
            item.selected = true;
            return item;
          } else {
            item.selected = false;
            return item;
          }
        });
        this.questionList[questionIndex].choices = options;
      } else if (
        questionType === this.question_type.choice &&
        isMultiple === 'true'
      ) {
        // Storing the user input for the checkbox based question
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
      // Type = Text
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
      // Type = Text
      this.questionList[questionIndex].value.trim().length === 0
        ? (isAnswered = false)
        : (isAnswered = true);
    } else if (questionType === this.question_type.choice) {
      // Type = Radio & Checkbox
      let options: any = [];
      options = this.questionList[questionIndex].choices;
      isAnswered = options.some((item: any) => {
        return item.selected === true;
      });
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
