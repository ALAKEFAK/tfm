import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class Farmer implements IMilestone {
    public name: string = 'Farmer';
    public description: string = 'Requires that you have at least 4 plant production'
    public getScore(player: Player): number {
      return player.getProduction(Resources.PLANTS);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 5;
    }
}
