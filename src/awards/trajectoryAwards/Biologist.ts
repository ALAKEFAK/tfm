import {IAward} from './../IAward';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class Biologist implements IAward {
  public name: string = 'Biologist';
  public description: string = 'Having the most microbe, plant and animal tags in play'
  public getScore(player: Player): number {
    return player.getTagCount(Tags.MICROBE, false, false) + player.getTagCount(Tags.PLANT, false, false) + player.getTagCount(Tags.ANIMAL, false, false);
  }
}
