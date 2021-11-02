import {IAward} from './../IAward';
import {Player} from '../../Player';
import {CardType} from '../../cards/CardType';

export class Microeconomist implements IAward {
  public name: string = 'Microeconomist';
  public description: string = 'Most cards in play (not events) with a cost of 10 megacredits or lower'
  public getScore(player: Player): number {
    return player.playedCards
      .filter((card) => (card.cost <= 10) && (card.cardType === CardType.ACTIVE || card.cardType === CardType.AUTOMATED)).length;
  }
}
