export class Player {
  public money: number = 1500;
  public location: number = 0;
    constructor (
      public propertiesOwned: number[],
      public name: string,
      public ifActive: boolean,
      public playerPiece: string,
    ) { }
  }
