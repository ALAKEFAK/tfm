import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class Spacefarer implements IMilestone {
  public name: string = 'Spacefarer';
  public description: string = 'Requires that you have 6 space tags'
  public getScore(player: Player): number {
    return player.getTagCount(Tags.SPACE);
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 6;
  }
}
