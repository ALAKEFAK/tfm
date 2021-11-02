import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Minimalist implements IMilestone {
    public name: string = 'Minimalist';
    public description: string = 'Having two or fewer card in your hand when you claim this milestone'
    public getScore(player: Player): number {
      return player.cardsInHand.length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) <= 2;
    }
}
