import { Injectable } from '@angular/core';

@Injectable()
export class DiceService {

  die: number;

  constructor() { }

  diceRoll() {
    return this.die = Math.floor((Math.random() * 6) + 1);
  }

}
