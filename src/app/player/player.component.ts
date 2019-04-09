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
  players: FirebaseListObservable<any[]>;
  location: number = 0;
  money: number;
  propertiesOwned: number[];
  name: string;
  ifActive: boolean;
  playerPiece: string;
  key: string;

  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  constructor(private diceService: DiceService, private propertyService: PropertyService, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.players = this.databaseService.getPlayers();
    this.prop = this.propertyService.getProperties();
    this.movement();
  }

  setValues(playerObj) {
    this.key = playerObj.$key;
    this.location = playerObj.location;
    this.money = playerObj.money;
    this.propertiesOwned = [];
    this.name = playerObj.name;
    this.ifActive = playerObj.ifActive;
    this.playerPiece = playerObj.playerPiece;
    this.playerDiceRoll();
  }

  playerDiceRoll() {
    this.removeClass();
    this.roll1 = this.diceService.diceRoll();
    this.roll2 = this.diceService.diceRoll();
    this.doubleCheck();
    this.movement();
    console.log(this.location)
  }

  doubleCheck() {
    const doubleOcc = this.diceService.doubles(this.roll1, this.roll2);
    if (doubleOcc === true) {
      this.doubleCount++;
    } else {
      this.doubleCount = 0;
    }
    this.movePlayer();
  }

  movePlayer() {

    this.taxes();
    console.log(this.money + "first")
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
    console.log(this.location);
  }

  taxes() {
    if(this.location===4){
      this.money -= 200;
    } else if(this.location===38){
      this.money -= 100;
    }
  }

  buyingProperty() {
    console.log(this.location);
    if(this.location===2 || this.location===7 || this.location===10 || this.location===17 || this.location===22 || this.location===33 || this.location===36){
      alert("cant buy fool")
    } else {
      if (this.prop[this.location].owner!==null){
        alert("pay rent");
      } else if (this.money<this.prop[this.location].price){
        alert("not enough funds");
      } else if (this.prop[this.location].owner == null && this.money>=this.prop[this.location].price){
        alert("you can buy this prop");
      }
    }
  }

  movement() {
    const car = document.getElementById("car");
    const currentLocation = this.location;
    const numToString = "b" + currentLocation.toString();
    car.classList.add(`${numToString}`);
    console.log(this.propertiesOwned);
    this.databaseService.updatePlayer(this.key, this.money, this.location, this.propertiesOwned, this.name, this.ifActive, this.playerPiece)
  }

  removeClass () {
    const car = document.getElementById("car");
    const currentLocation = this.location;
    const numToString = "b" + currentLocation.toString();

    car.classList.remove(`${numToString}`);
    console.log(numToString);
  }
}
