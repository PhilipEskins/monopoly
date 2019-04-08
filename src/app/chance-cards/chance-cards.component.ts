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

  constructor() { }

  ngOnInit() {
  }

}
