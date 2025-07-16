import { Component } from '@angular/core';
import { generate } from 'rxjs';
import 'animate.css';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrls: ['./game.css'],
})
export class Game {
  gameTitle = 'Hi & Lo';
  cardNumber = 0;
  lastCardNumber = -1;
  score = 0;
  cardTypes = ['hearts', 'diamonds', 'clubs', 'spades'];
  cardSrc = '';
  guessedHi = false;

  /* constructor() {
    this.generateCard(); //apelam metoda pentru a genera un numar de carte la initializare
  } */

  ngOnInit() {
    this.generateCard(); // apelam metoda pentru a genera un numar de carte la initializare
  }

  generateCard() {
    this.lastCardNumber = this.cardNumber; // salvam numarul de carte generat anterior
    // [0; 1) *15 => [0; 15)
    // [0; 1) *13 + 2 => [0; 15) => [2; 15)
    this.cardNumber = Math.floor(Math.random() * 13 + 2); // [0; 1)
    // [0; 1) => [0;4)
    let cardTypeNo = Math.floor(Math.random() * 4);
    console.log(this.cardTypes[cardTypeNo]);
    
    this.cardSrc = `${this.cardNumber}_of_${this.cardTypes[cardTypeNo]}.svg`;
  }

  checkCards() {
   // if guessed Hi
   if (this.guessedHi) {
      if (this.cardNumber >= this.lastCardNumber) {
//increase score
this.score++;
   //else guessed Lo
  } 
  else {
    this.score--;
    this.animateWrong();
  } }
  else {
    if (this.cardNumber <= this.lastCardNumber) {
      //increase score
      this.score++;
    }else {
      //decrease score
      this.score--;
    }
  }

   }
  
  guessHi() {
    this.guessedHi = true; // setam ca am ghicit Hi
    console.log('Hi');
    this.generateCard(); // generam o noua carte dupa ce am ghicit
    this.checkCards();
  }

  guessLo() {
    this.guessedHi = false; // setam ca am ghicit Lo
    console.log('Lo');
    this.generateCard(); // generam o noua carte dupa ce am ghicit
    this.checkCards();
  }

  animateWrong() {
    this.wrongGuessClasses = 'animate__animated animate__shakeX';
}
}

