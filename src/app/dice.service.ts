import { Injectable } from '@angular/core';

@Injectable()
export class DiceService {

  die: number;

  constructor() { }

  diceRoll() {
    return this.die = Math.floor((Math.random() * 6) + 1);
  }



  doubles(roll1, roll2) {
    if (roll1===roll2){
      return true
    }
    else {
      return false
    };
  }

}
