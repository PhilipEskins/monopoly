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
  playedChanceCards = [];

  randomChanceCard;

  constructor(private chanceCardsService: ChanceCardsService) { }

  ngOnInit() {
    this.chanceCards = this.chanceCardsService.getChanceCards();
  }

  chanceCardGenerator() {
    let card = Math.floor(Math.random() * this.chanceCards.length);
    this.randomChanceCard = this.chanceCards[card].description;
    this.playedChanceCards.push(this.chanceCards[card]);
    
    if (this.chanceCards.length <= 1) {
      this.chanceCards = this.playedChanceCards;
      this.playedChanceCards = [];
    } else {
      this.chanceCards.splice(card, 1);
    }
  }
}
