import { Component, OnInit } from '@angular/core';
import { ChanceCard } from '../chance-cards.model'
import { ChanceCardsService } from '../chance-cards.service';

@Component({
  selector: 'app-chance-cards',
  templateUrl: './chance-cards.component.html',
  styleUrls: ['./chance-cards.component.scss'],
  providers: [ChanceCardsService]
})

export class ChanceCardsComponent implements OnInit {
  chanceCards: ChanceCard[];

  constructor(private chanceCardsService: ChanceCardsService) { }

  ngOnInit() {
    this.chanceCards = this.chanceCardsService.getChanceCards();
    console.log(this.chanceCards);
  }

}
