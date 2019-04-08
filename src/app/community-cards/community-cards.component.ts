import { Component, OnInit } from '@angular/core';
import { CommunityCardsService } from '../community-cards.service';

@Component({
  selector: 'app-community-cards',
  templateUrl: './community-cards.component.html',
  styleUrls: ['./community-cards.component.css'],
  providers: [CommunityCardsService]
})
export class CommunityCardsComponent {
  // communityCards: CommunityCard[];

  constructor(private communityCardsService: CommunityCardsService) {
  console.log(communityCardsService)}

  ngOnInit() {
  }

}
