import { Component, OnInit, Input } from '@angular/core';
import { DiceService } from '../dice.service';
import { Player } from '../player.model';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DiceService, PropertyService, DatabaseService]
})
export class PlayerComponent implements OnInit {
  prop: Property[];
  players: Player[];
  location: number = 0;
  money: number;
  name: string;
  ifActive: boolean;
  playerPiece: string;
  key: string;
  position = 0;
  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  constructor(private diceService: DiceService, private propertyService: PropertyService, private databaseService: DatabaseService) {
  }


  ngOnInit() {
    this.databaseService.getPlayers().subscribe(dataLastEmittedFromObserver => {
      return this.players = dataLastEmittedFromObserver;

    })
    // this.players = this.databaseService.getPlayers();
    this.prop = this.propertyService.getProperties();
    this.movement();
  }

  endTurn() {
    const hide = document.getElementById("hideRoll");
    hide.classList.remove("hideRolll") ;
    this.ifActive = false;
    this.newInfo();
    this.position += 1;
    if(this.position >= this.players.length) {
      this.position = 0,
      this.players[this.position].ifActive = true;
      this.setValues(this.players[this.position]);
      this.newInfo();
    } else {
      this.players[this.position].ifActive = true;
      this.setValues(this.players[this.position]);
      this.newInfo();
    }
  }

  newInfo() {
    this.databaseService.updatePlayer(this.key, this.money, this.location, this.name, this.ifActive, this.playerPiece);
  }


  setValues(playerObj) {
    this.key = playerObj.$key;
    this.location = playerObj.location;
    this.money = playerObj.money;
    this.name = playerObj.name;
    this.ifActive = playerObj.ifActive;
    this.playerPiece = playerObj.playerPiece;
  }

  playerDiceRoll() {
    this.setValues(this.players[this.position]);
    this.removeClass();
    this.roll1 = this.diceService.diceRoll();
    this.roll2 = this.diceService.diceRoll();
    this.taxes();
    this.doubleCheck();
    this.movement();
  }


  doubleCheck() {
    const doubleOcc = this.diceService.doubles(this.roll1, this.roll2);
    const hide = document.getElementById("hideRoll");
    if (doubleOcc === true) {
      this.doubleCount++;
    } else {
      this.doubleCount = 0;
      hide.classList.add("hideRolll") ;
    }
    this.movePlayer();
  }

  movePlayer() {

    this.taxes();
    if (this.location===40){
      if (this.roll1===this.roll2) {
        this.location=10;
      } else if (this.roll1!==this.roll2){
        this.location=40;
      }
    } else if (this.location <= 39){
      this.playerMove = this.roll1 + this.roll2;
      this.location = this.playerMove + this.location;
      if ( this.location >= 39 ) {
        this.location -= 39;
        this.money += 200;
      } else if (this.location===30 ){
        this.location=40;
      }
    }
  }

  taxes() {
    if(this.location===4){
      this.money -= 200;
    } else if(this.location===38){
      this.money -= 100;
    }
  }


  movement() {
    const car = document.getElementById(this.playerPiece);
    const currentLocation = this.location;
    const numToString = "b" + currentLocation.toString();
    car.classList.add(`${numToString}`);
    this.newInfo();
  }

  removeClass () {
    const car = document.getElementById(this.playerPiece);
    const currentLocation = this.location;
    const numToString = "b" + currentLocation.toString();

    car.classList.remove(`${numToString}`);
  }
}
