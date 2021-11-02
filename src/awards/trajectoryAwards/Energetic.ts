import {IAward} from './../IAward';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class Energetic implements IAward {
  public name: string = 'Energetic';
  public description: string = 'Having the most power tags in play'
  public getScore(player: Player): number {
    return player.getTagCount(Tags.ENERGY, false, false);
  }
}
