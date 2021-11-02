import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class Smith implements IMilestone {
    public name: string = 'Smith';
    public description: string = 'Requires that you have at least 7 production of steel or titanium combined'
    public getScore(player: Player): number {
      return player.getProduction(Resources.STEEL) + player.getProduction(Resources.TITANIUM);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 7;
    }
}
