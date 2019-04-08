import { Component, OnInit } from '@angular/core';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DiceService]
})
export class PlayerComponent implements OnInit {

  constructor(private diceService: DiceService) { }

  ngOnInit() {
  }

  playerDiceRoll() {
    const roll1 = this.diceService.diceRoll();
    const roll2 = this.diceService.diceRoll();
    console.log(roll1, roll2);
  }

}
