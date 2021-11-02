import {IAward} from './../IAward';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class Distributer implements IAward {
    public name: string = 'Distributer';
    public description: string = 'Having the most set of six different productions'
    public getScore(player: Player): number {
      return Math.min(player.getProduction(Resources.MEGACREDITS), player.getProduction(Resources.STEEL),
        player.getProduction(Resources.TITANIUM), player.getProduction(Resources.PLANTS),
        player.getProduction(Resources.ENERGY), player.getProduction(Resources.HEAT));
    }
}
