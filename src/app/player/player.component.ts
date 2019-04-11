import { Component, OnInit, Input } from '@angular/core';
import { DiceService } from '../dice.service';
import { Player } from '../player.model';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatabaseService } from '../database.service';
import { CommunityCard } from '../community-cards.model'
import { CommunityCardsService } from '../community-cards.service';
import { ChanceCard } from '../chance-cards.model'
import { ChanceCardsService } from '../chance-cards.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [DiceService, PropertyService, DatabaseService, CommunityCardsService, ChanceCardsService]
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



  communityCards: CommunityCard[];
  playedCommunityCards = [];


  chanceCards: ChanceCard[];
  playedChanceCards = [];

  randomChanceCard;

  randomCommunityCard;

  constructor(private diceService: DiceService, private propertyService: PropertyService, private databaseService: DatabaseService, private communityCardsService: CommunityCardsService, private chanceCardsService: ChanceCardsService) {
  }


  ngOnInit() {
    this.databaseService.getPlayers().subscribe(dataLastEmittedFromObserver => {
      return this.players = dataLastEmittedFromObserver;
    })
    this.prop = this.propertyService.getProperties();
    this.movement();
    this.communityCards = this.communityCardsService.getCommunityCards();
    this.chanceCards = this.chanceCardsService.getChanceCards();
  }

  consolelogging() {
    console.log(this.communityCardsService.getCommunityCards());
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
    this.communityCardGenerator();
    this.chanceCardGenerator();
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


  buyingProperty() {
    if(this.location===4 || this.location===10 || this.location===20 || this.location===22 || this.location===38 || this.location===40 || this.location===7 || this.location===12 || this.location===36 || this.location===2 || this.location===17 || this.location===33){

      alert("cant buy fool")
    } else if (this.prop[this.location].owner!==null){

        if(this.prop[this.location].owner === this.players[this.position].name) {
          alert("you own this")
        } else {
          const player1Money = this.money;
          if (this.prop[this.location].owner === this.players[0].name){
            this.players[0].money += this.prop[this.location].rent;
            this.players[1].money -= this.prop[this.location].rent;
            this.newInfo();
          } else if (this.prop[this.location].owner === this.players[1].name){
            this.players[1].money += this.prop[this.location].rent;
            this.players[0].money -= this.prop[this.location].rent;
            this.newInfo();
          }
          alert("pay rent");
        }
      } else if (this.money<this.prop[this.location].price){
        alert("not enough funds");
      } else if (this.prop[this.location].owner == null && this.money>=this.prop[this.location].price){
        if (confirm("Are you sure you want to buy this?")){
          this.prop[this.location].owner = this.name;
          this.money -= this.prop[this.location].price;
          return this.money;
        }
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

  communityCardGenerator() {
    let card = Math.floor(Math.random() * this.communityCards.length);

    if (this.location===2 || this.location===17 || this.location===33){
      console.log(this.randomCommunityCard)
      this.randomCommunityCard = this.communityCards[card].description;

      this.playedCommunityCards.push(this.communityCards[card]);

      if(this.communityCards.length <= 1) {
        this.communityCards = this.playedCommunityCards;
        this.playedCommunityCards = [];
      } else {
        this.communityCards.splice(card, 1);
      }
      return this.randomCommunityCard;
    }
  }

  chanceCardGenerator() {
    let card = Math.floor(Math.random() * this.chanceCards.length);

    if (this.location===7 || this.location===12 || this.location===36){
      console.log(this.randomChanceCard)
      this.randomChanceCard = this.chanceCards[card].description;
      this.playedChanceCards.push(this.chanceCards[card]);

      if (this.chanceCards.length <= 1) {
        this.chanceCards = this.playedChanceCards;
        this.playedChanceCards = [];
      } else {
        this.chanceCards.splice(card, 1);
      }
      return this.randomChanceCard;
    }

  }
}
