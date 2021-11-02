import {IAward} from './../IAward';
import {Player} from '../../Player';
import {BASE_CARD_MANIFEST} from '../../cards/StandardCardManifests';
import {CardType} from '../../cards/CardType';

export class Originalist implements IAward {
  public name: string = 'Originalist';
  public description: string = 'Most cards in play (not events) from the base game (not from corporate era or any expansion)'
  public getScore(player: Player): number {
    return player.playedCards.filter((card) => (BASE_CARD_MANIFEST.projectCards.factories.has(card.name)) && (card.cardType === CardType.ACTIVE || card.cardType === CardType.AUTOMATED) ).length;
  }
}
