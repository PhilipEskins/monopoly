import { Injectable } from '@angular/core';
import { CommunityCard } from './community-cards.model';
import { COMMUNITY } from './communitycards-data';

@Injectable()
export class CommunityCardsService {

  constructor() { }

  getCommunityCards() {
    return COMMUNITY;
  }

}
