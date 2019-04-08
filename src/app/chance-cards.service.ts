import { Injectable } from '@angular/core';
import { ChanceCard } from './chance-cards.model';
import { CHANCE } from './chancecards-data';

@Injectable()
export class ChanceCardsService {

  constructor() { }

  getCommunityCards() {
    return CHANCE;
  }

}
