import {Color} from '../Color';
import {GameModel} from './GameModel';
import {PlayerModel} from './PlayerModel';

export interface SpectatorModel {
  color: Color;
  id: string; // SpectatorID
  players: Array<PlayerModel>;
  game: GameModel
}
