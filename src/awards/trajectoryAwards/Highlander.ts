import {IAward} from './../IAward';
import {Player} from '../../Player';
import {Board} from '../../boards/Board';
import {SpaceType} from '../../SpaceType';
import {isAresTile} from '../../TileType';

export class Highlander implements IAward {
    public name: string = 'Highlander';
    public description: string = 'Most tiles on Mars not adjacent to ocean tiles'
    public getScore(player: Player): number {
      return player.game.board.spaces.filter((space) =>
        space.player === player &&
        space.tile !== undefined &&
        isAresTile(space.tile.tileType) === false &&
        space.spaceType !== SpaceType.COLONY &&
        player.game.board.getAdjacentSpaces(space).every((space) => !Board.isOceanSpace(space)),
      ).length;
    }
}
