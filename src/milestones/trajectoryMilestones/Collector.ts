import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';

export class Collector implements IMilestone {
    public name: string = 'Collector';
    public description: string = 'Requires that you have at least 3 types of non-standard resources on cards'
    public getScore(player: Player): number {
      const nonStandardResources = new Set(player.getCardsWithResources().map((card) => card.resourceType)).size;
      return nonStandardResources;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}
