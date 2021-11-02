import {IAward} from './../IAward';
import {Player} from '../../Player';
import {isAresTile} from '../../TileType';

export class Equatorial implements IAward {
    public name: string = 'Equatorial';
    public description: string = 'Most tiles on the equator (the middle three rows)'
    public getScore(player: Player): number {
      return player.game.board.spaces
        .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            isAresTile(space.tile.tileType) === false &&
            space.y >= 3 && space.y <= 5).length;
    }
}
