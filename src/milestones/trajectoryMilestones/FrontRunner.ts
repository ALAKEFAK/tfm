import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {CardType} from '../../cards/CardType';

export class FrontRunner implements IMilestone {
    public name: string = 'Front Runner';
    public description: string = 'Having at least a net total of 6 victory points on cards in play (not counting event cards)'
    public getScore(player: Player): number {
      let score = 0;
      // Victory points from corporation
      if (player.corporationCard !== undefined && player.corporationCard.getVictoryPoints !== undefined) {
        score += player.corporationCard.getVictoryPoints(player);
      }
      // Victory points from cards
      for (const playedCard of player.playedCards) {
        if (playedCard.getVictoryPoints !== undefined && playedCard.cardType !== CardType.EVENT) {
          score += playedCard.getVictoryPoints(player);
        }
      }
      return score;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 6;
    }
}
