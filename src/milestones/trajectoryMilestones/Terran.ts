import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class Terran implements IMilestone {
  public name: string = 'Terran';
  public description: string = 'Requires that you have 6 earth tags'
  public getScore(player: Player): number {
    return player.getTagCount(Tags.EARTH);
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 6;
  }
}
