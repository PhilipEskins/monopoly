export class Player {
  public money: number = 1500;
  public location: number = 39;
  public propertiesOwned: number[];
    constructor (public name: string, public ifActive: boolean, public playerPiece: string) { }
  }
