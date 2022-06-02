import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Resources} from '../Resources';

export class Specialist implements IMilestone {
    public name: string = 'Specialist';
    public description: string = 'Requires that you have at least 20 MC production or 10 in production of any other resource'
    public getScore(player: Player): number {
      return Math.max(player.getProduction(Resources.STEEL),
        player.getProduction(Resources.TITANIUM),
        player.getProduction(Resources.PLANTS),
        player.getProduction(Resources.ENERGY),
        player.getProduction(Resources.HEAT));
    }
    public canClaim(player: Player): boolean {
      return player.getProduction(Resources.MEGACREDITS) >= 20 || this.getScore(player) > 9;
    }
}
