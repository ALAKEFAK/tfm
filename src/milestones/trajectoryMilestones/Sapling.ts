import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Sapling implements IMilestone {
    public name: string = 'Sapling';
    public description: string = 'Requires that you have at least 12 plant resources'
    public getScore(player: Player): number {
      return player.plants;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 12;
    }
}
