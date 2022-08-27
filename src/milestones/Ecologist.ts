import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class Ecologist implements IMilestone {
    public name: string = 'Ecologist';
    public description: string = 'Requires that you have 5 bio tags (plant, microbe and animal tags count as bio tags)'
    public getScore(player: Player): number {
      const tags: Array<Tags> = [Tags.PLANT, Tags.ANIMAL, Tags.MICROBE];
      return player.getMultipleTagCountWildtagOnce(tags);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 5;
    }
}
