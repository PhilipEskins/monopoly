import { Component, OnInit, Input } from '@angular/core';
import { DiceService } from '../dice.service';
import { Player } from '../player.model';
import { PropertyService } from '../property.service';
import { Property } from '../properties.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [DiceService, PropertyService]
})
export class PlayerComponent implements OnInit {
  prop: Property[];


  roll1: number;
  roll2: number;
  doubleCount: number = 0;
  playerMove: number;

  constructor(private diceService: DiceService, private propertyService: PropertyService) { }
  players: Player =
  new Player([], "Mr.Monopoly", true, "");



  ngOnInit() {
    this.prop = this.propertyService.getProperties();
  }

  playerDiceRoll() {
    this.roll1 = this.diceService.diceRoll();
    this.roll2 = this.diceService.diceRoll();
    this.taxes();
    this.doubleCheck();

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


    console.log(this.players.money + "first")
    if (this.players.location===40){
      if (this.roll1===this.roll2) {
        this.players.location=10;
      } else if (this.roll1!==this.roll2){
        this.players.location=40;
      }
    } else if (this.players.location <= 39){
      this.playerMove = this.roll1 + this.roll2;
      this.players.location = this.playerMove + this.players.location;
      if ( this.players.location >= 39 ) {
        this.players.location -= 39;
        this.players.money += 200;
      } else if (this.players.location===30 ){
        this.players.location=40;
      }
    }
    console.log(this.players.location);
  }

  taxes() {
    if(this.players.location===4){
      this.players.money -= 200;
    } else if(this.players.location===38){
      this.players.money -= 100;
    }
  }

  buyingProperty() {
    console.log(this.players.location);
    if(this.players.location===2 || this.players.location===4 || this.players.location===7 || this.players.location===10 || this.players.location===17 || this.players.location===22 || this.players.location===33 || this.players.location===36 || this.players.location===38){
      alert("cant buy fool")
    } else {
      if (this.prop[this.players.location].owner!==null){
        alert("pay rent");
      } else if (this.players.money<this.prop[this.players.location].price){
        alert("not enough funds");
      } else if (this.prop[this.players.location].owner == null && this.players.money>=this.prop[this.players.location].price){
        if (confirm("Are you sure you want to buy this?")){
          (this.players.propertiesOwned).push(this.prop[this.players.location].location);
          this.prop[this.players.location].owner = true;
          this.players.money -= this.prop[this.players.location].price;
        }
      }
    }
  }

}
