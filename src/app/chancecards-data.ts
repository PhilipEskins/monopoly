import { ChanceCard } from './chance-cards.model';

export const CHANCE: ChanceCard[] = [
  new ChanceCard("LOANS", 150, "YOUR BUILDING AND LOAN MATURES (COLLECT $150)"),
  new ChanceCard("JAIL FREE", 0, "GET OUT OF JAIL FREE (USE OR HOLD)"),
  new ChanceCard("DIVIDEND", 50, "BANK PAYS YOU DIVIDEND OF $50"),
  new ChanceCard("POOR TAX", -15, "PAY POOR TAX OF $15"),
  new ChanceCard("TRAIN", 200, "IF YOU PASS GO COLLECT $200"),
  new ChanceCard("GO", 200, "ADVANCE TO GO"),
  new ChanceCard("ST.CHARLES", 200, "ADVANCE TO ST. CHARLES PLACE (IF YOU PASS GO, COLLECT $200)"),
  new ChanceCard("3 SPACES", 0, "GO BACK 3 SPACES"),
  new ChanceCard("BOARDWALK", 0, "TAKE A WALK ON THE BOARDWALK"),
  new ChanceCard("TRAIN", 0, "ADVANCE TO THE NEAREST RAILROAD (PAY OWNER TWICE THE RENT)"),
  new ChanceCard("UTILITY", 0, "ADVANCE TO NEAREST ULTILITY (IF OWNED: THROW DICE & PAY OWNER 10X THE AMOUNT THROWN)"),
  new ChanceCard("TRAIN", 0, "ADVANCE TO THE NEAREST RAILROAD (PAY OWNER TWICE THE RENT)"),
  new ChanceCard("ADVANCE", 0, "ADVANCE TO ILLINOIS AVE"),
  new ChanceCard("JAIL", 0, "GO DIRECTLY TO JAIL"),
];
