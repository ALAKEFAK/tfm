import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Completionist implements IMilestone {
  public name: string = 'Completionist';
  public description: string = 'Having claimed the other two milestones'
  public getScore(player: Player): number {
    if (player.game.claimedMilestones.length === 0) {
      return 0;
    }
    let score = 0;
    player.game.claimedMilestones.forEach((milestone) => {
      if (milestone.player === player) score++;
    });
    return score;
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 2;
  }
}
