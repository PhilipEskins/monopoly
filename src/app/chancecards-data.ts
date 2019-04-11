import { ChanceCard } from './chance-cards.model';

export const CHANCE: ChanceCard[] = [
  new ChanceCard(null, 150, "YOUR BUILDING AND LOAN MATURES (COLLECT $150)"),
  new ChanceCard(10, 0, "GET OUT OF JAIL FREE (USE OR HOLD)"),
  new ChanceCard(null, 50, "BANK PAYS YOU DIVIDEND OF $50"),
  new ChanceCard(null, -15, "PAY POOR TAX OF $15"),
  new ChanceCard(5, 200, "IF YOU PASS GO COLLECT $200"),
  new ChanceCard(0, 200, "ADVANCE TO GO"),
  new ChanceCard(11, 200, "ADVANCE TO ST. CHARLES PLACE (IF YOU PASS GO, COLLECT $200)"),
  new ChanceCard(null, 0, "GO BACK 3 SPACES"),
  new ChanceCard(39, 0, "TAKE A WALK ON THE BOARDWALK"),
  new ChanceCard(15, 0, "ADVANCE TO THE NEAREST RAILROAD (PAY OWNER TWICE THE RENT)"),
  new ChanceCard(28, 0, "ADVANCE TO NEAREST ULTILITY (IF OWNED: THROW DICE & PAY OWNER 10X THE AMOUNT THROWN)"),
  new ChanceCard(25, 0, "ADVANCE TO THE NEAREST RAILROAD (PAY OWNER TWICE THE RENT)"),
  new ChanceCard(24, 0, "ADVANCE TO ILLINOIS AVE"),
  new ChanceCard(40, 0, "GO DIRECTLY TO JAIL"),
];
