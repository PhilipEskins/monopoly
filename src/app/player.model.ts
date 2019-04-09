export class Player {
  public money: number = 1500;
  public location: number = 0;
  public propertiesOwned: number[];
    constructor (
      public name: string,
      public ifActive: boolean,
      public playerPiece: string
    ) { }
  }

  // if (this.player.location===this.properties.location && this.property.owner==null && this.player.money>=this.property.price){
  //   alert("you can buy this property")
  // } else if (this.player.location!==this.properties.location){
  //   alert("game is broken")
  // } else if (this.property.owner!==null){
  //   alert("pay rent")
  // } else if (this.player.money<this.property.price){
  //   alert("not enough funds")
  // }
