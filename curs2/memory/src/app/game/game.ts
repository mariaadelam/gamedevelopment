import { Component } from '@angular/core';
import { generate } from 'rxjs';


@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css',
})

export class Game {
  gameTitle = 'Hi & Lo';
  cardNumber = 0;
  cardTypes = ['hearts', 'diamonds', 'clubs', 'spades'];
  cardSrc = '';

  /* constructor() {
    this.generateCard(); //apelam metoda pentru a genera un numar de carte la initializare
  } */

  ngOnInit() {
    this.generateCard(); // apelam metoda pentru a genera un numar de carte la initializare
  }

  generateCard() {
    // [0; 1) *15 => [0; 15)
    // [0; 1) *13 + 2 => [0; 15) => [2; 15)
    this.cardNumber = Math.floor(Math.random() * 13 + 2); // [0; 1) 
    

    // [0; 1) => [0;4)
    let cardTypeNo = Math.floor(Math.random() * 4);
    console.log(this.cardTypes[cardTypeNo]);
    this.cardSrc = `${this.cardNumber}_of_${this.cardTypes[cardTypeNo]}.svg`;
  }

 
}

