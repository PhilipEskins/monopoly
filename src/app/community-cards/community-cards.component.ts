import { Component, OnInit } from '@angular/core';
import { CommunityCard } from '../community-cards.model'
import { CommunityCardsService } from '../community-cards.service';

@Component({
  selector: 'app-community-cards',
  templateUrl: './community-cards.component.html',
  styleUrls: ['./community-cards.component.css'],
  providers: [CommunityCardsService]
})
export class CommunityCardsComponent implements OnInit {
  communityCards: CommunityCard[];


  constructor(private communityCardsService: CommunityCardsService) {}

  ngOnInit() {
    this.communityCards = this.communityCardsService.getCommunityCards();
  }

}
