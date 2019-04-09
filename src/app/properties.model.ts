export class Property {
  public owner: boolean = null;

  constructor(
    public location: number,
    public price: number,
    public rent: number,
  ) {}
}
