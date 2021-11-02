import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {CardType} from '../../cards/CardType';

export class Setter implements IMilestone {
    public name: string = 'Setter';
    public description: string = 'Requires that you have at least 3 sets of automated/active/event cards'
    public getScore(player: Player): number {
      const numAutomatedCards = player.playedCards.filter((card) => card.cardType === CardType.AUTOMATED).length;
      const numActiveCards = player.playedCards.filter((card) => card.cardType === CardType.ACTIVE).length;
      const numEventCards = player.getPlayedEventsCount();
      return Math.min(numAutomatedCards, numActiveCards, numEventCards);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}
