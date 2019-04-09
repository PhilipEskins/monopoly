import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { PLAYERS } from './sample-players';

@Injectable()
export class PlayersService {

  constructor() { }
  getPlayers() {
    return PLAYERS;
  }
}
