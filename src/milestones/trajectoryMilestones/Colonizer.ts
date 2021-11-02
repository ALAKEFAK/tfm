import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Colonizer implements IMilestone {
    public name: string = 'Colonizer';
    public description: string = 'Requires that you have at least 4 colonies'
    public getScore(player: Player): number {
      return player.getColoniesCount();
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 4;
    }
}
