import {IAward} from './../IAward';
import {Player} from '../../Player';

export class Importer implements IAward {
  public name: string = 'Importer';
  public description: string = 'Having the most colonies'
  public getScore(player: Player): number {
    return player.getColoniesCount();
  }
}
