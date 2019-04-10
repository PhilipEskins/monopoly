import { Component, OnInit } from '@angular/core';
import { CommunityCard } from '../community-cards.model'
import { CommunityCardsService } from '../community-cards.service';

@Component({
  selector: 'app-community-cards',
  templateUrl: './community-cards.component.html',
  styleUrls: ['./community-cards.component.scss'],
  providers: [CommunityCardsService]
})

export class CommunityCardsComponent implements OnInit {
  communityCards: CommunityCard[];
  playedCommunityCards = [];

  randomCommunityCard;

  constructor(private communityCardsService: CommunityCardsService) {}

  ngOnInit() {
    this.communityCards = this.communityCardsService.getCommunityCards();
  }

  communityCardGenerator() {
    let card = Math.floor(Math.random() * this.communityCards.length);
    this.randomCommunityCard = this.communityCards[card].description;
    this.playedCommunityCards.push(this.communityCards[card]);

    if(this.communityCards.length <= 1) {
      this.communityCards = this.playedCommunityCards;
      this.playedCommunityCards = [];
    } else {
      this.communityCards.splice(card, 1);
    }
  }
}
