import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class MorningStar implements IMilestone {
  public name: string = 'Morning Star';
  public description: string = 'Requires that you have 4 venus tags'
  public getScore(player: Player): number {
    return player.getTagCount(Tags.VENUS);
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 4;
  }
}
