import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class DatabaseService {
  players: FirebaseListObservable<any[]>;

constructor(private database: AngularFireDatabase){
  this.players = database.list('players');
}

  getPlayers(){
    return this.players;
  }

  updatePlayer(playerKey, playerMoney, playerLocation, playerPropertiesOwned, playerName, playerIfActive, playerPlayerPiece) {
    const playerInFirebase = this.getPlayerToUpdate(playerKey);
    playerInFirebase.update({
      money: playerMoney,
      location: playerLocation,
      propertiesOwned: playerPropertiesOwned,
      name: playerName,
      ifActive: playerIfActive,
      playerPiece: playerPlayerPiece
    })
  }

  getPlayerToUpdate(playerId) {
    return this.database.object('/players/' + playerId)
  }
}
