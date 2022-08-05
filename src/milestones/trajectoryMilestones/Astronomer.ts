import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {Tags} from '../../cards/Tags';

export class Astronomer implements IMilestone {
  public name: string = 'Astronomer';
  public description: string = 'Requires that you have 7 earth, venus, or jovian tags'
  public getScore(player: Player): number {
    const tags: Array<Tags> = [Tags.EARTH, Tags.VENUS, Tags.JOVIAN];
    return player.getMultipleTagCountWildtagOnce(tags);
  }
  public canClaim(player: Player): boolean {
    return this.getScore(player) >= 7;
  }
}
