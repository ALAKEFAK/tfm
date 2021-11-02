import {IAward} from './../IAward';
import {Player} from '../../Player';
import {Resources} from '../../Resources';

export class Naturalist implements IAward {
    public name: string = 'Naturalist';
    public description: string = 'Having the highest heat and plant production combined'
    public getScore(player: Player): number {
      return player.getProduction(Resources.HEAT) + player.getProduction(Resources.PLANTS);
    }
}
