import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
[x: string]: any;
  
  title: string = '';

  questions : any;
  questionSelected: any;

  answers: string[] = [];
  answersSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex : number = 0;

  gameFinished = false;


  ngOnInit(): void {
    if (quizz_questions) {
      this.gameFinished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];  
    } else {
      this.gameFinished = true;
      const finalResult: string = await this.moreFrequentlyAlias(this.answers);
      this.answersSelected = quizz_questions.results[finalResult as keyof typeof quizz_questions.results];
    }
  }

  async moreFrequentlyAlias(answers: string[]) {
    const result = answers.reduce((prev, current, index, arr) => {
      if (
          arr.filter(item => item === prev).length > 
          arr.filter(item => item === current).length
        ) { return prev; } 
      else {
        return current;
      }
    });
    return result;
  }
}
