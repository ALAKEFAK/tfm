import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Resources} from '../Resources';

export class Specialist implements IMilestone {
  public name: string = 'Business, man';
  public description: string = 'Requires that you have at least 20 MC production'
  public getScore(player: Player): number {
    return player.getProduction(Resources.MEGACREDITS);
  }
  public canClaim(player: Player): boolean {
    return player.getProduction(Resources.MEGACREDITS) >= 20;
  }
}
