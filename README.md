# MyInsurance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Functional Overview

- This application deals with an insurance form submitting certain questions from a questionniare available in JSON format.
- The questionniare consists of 3 types of questions: 1. Text answer, 2. Multiple choice(Single Select), 3. Multiple choice(Multi-Select). There are three UI pages available in the application: 1. Home Page(Begin button will start the questionniare), 2. Question Page(Contains the question, description and the answers), 3. Submit Page(Successful completion message and button to return to Home page).
- There might be mandatory questions present in the questionnaire, if present answering the question is mandatory before proceeding to next question.
- Next and Previous buttons are available for each questions to navigate through the questionniare any time as per the users choice.
- Certain answer choices for certain questions will jump to a related questions irrespective of the position of the question in the questionniare, when clicked on the next button. On the new question, when clicked on the previous button, the user will return back to the caller question.
- A submit button will be present in the last question of the questionniare, when clicked will navigate to the success page.
- In the success the page, there will be a button to return to home page.

## Technical Aspects

- There are 4 Components and 1 Service present.
- 1. InsuranceHomeComponent: Home page of application.
- 2. InsuranceFormComponent: Question Page
- 3. InsuranceFormSuccessComponent: Success Page
- 4. HeaderComponent: Page header for the application

- Unit Test cases are added.

## Prerequisites

- An active Node environment installation.

## Project Configuration and Setup

- Clone the project from Git.
- Navigate to the project directory.
- Run `npm install` in the terminal.
- To change the questionniare, replace the contents of the file `questionniare.json` in `assets/questions`.
- Run `ng serve` for development server and open `http://localhost:4200/` in the browser.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
