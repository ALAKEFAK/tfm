import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Gambler implements IMilestone {
  public name: string = 'Gambler';
  public description: string = 'Having funded at least two awards'
  public getScore(player: Player): number {
    if (player.game.fundedAwards.length === 0) {
      return 0;
    }
    let score = 0;
    player.game.fundedAwards.forEach((award) => {
      if (award.player === player) score++;
    });
    return score;
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 2;
  }
}
