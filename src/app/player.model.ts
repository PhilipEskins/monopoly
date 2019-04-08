export class Player {
  public money: number = 1500;
  public location: number = 0;
  public propertiesOwned: number[];
    constructor (public name: string, public ifActive: boolean) { }
}
