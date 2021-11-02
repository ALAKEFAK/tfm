import {IAward} from './../IAward';
import {Player} from '../../Player';

export class Coordinator implements IAward {
  public name: string = 'Coordinator';
  public description: string = 'Having played the most event cards'
  public getScore(player: Player): number {
    return player.getPlayedEventsCount();
  }
}
