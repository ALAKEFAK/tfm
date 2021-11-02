import {IAward} from './../IAward';
import {Player} from '../../Player';
import {CardType} from '../../cards/CardType';

export class Adapter implements IAward {
    public name: string = 'Adapter';
    public description: string = 'Most cards with requirements in play'
    private excludedCardTypes = [CardType.PRELUDE, CardType.EVENT];

    public getScore(player: Player): number {
      const validCards = player.playedCards.filter((card) => {
        const isValidCardType = !this.excludedCardTypes.includes(card.cardType);
        const hasRequirements = card.requirements !== undefined;

        return isValidCardType && hasRequirements;
      });

      return validCards.length;
    }
}
