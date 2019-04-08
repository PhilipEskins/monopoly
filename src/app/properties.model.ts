export class Property {
  public owner: string = null;

  constructor(
    public location: number,
    public price: number,
    public rent: number,
  ) {}
}
