import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { DiceService} from '../dice.service';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [DiceService, PropertyService, DatabaseService]
})
export class BoardComponent implements OnInit {

  players: FirebaseListObservable<any[]>;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

}
