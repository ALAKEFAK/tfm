import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class Diversifier implements IMilestone {
    public name: string = 'Diversifier';
    public description: string = 'Requires that you have 8 different tags in play'
    public getScore(player: Player): number {
      let eligibleTagCount = player.getDistinctTagCount(false);
      if (player.getTagCount(Tags.WILDCARD) >= 1) {
        eligibleTagCount++;
      }
      return eligibleTagCount;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 8;
    }
}
