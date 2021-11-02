import {IAward} from './../IAward';
import {Player} from '../../Player';
import {isAresTile} from '../../TileType';

export class EdgeDancer implements IAward {
  public name: string = 'Edge Dancer';
  public description: string = 'Most tiles on the edges of the board'
  public getScore(player: Player): number {
    return player.game.board.spaces
      .filter((space) => space.player !== undefined &&
          space.player === player &&
          space.tile !== undefined &&
          isAresTile(space.tile.tileType) === false &&
          this.isOnEdge(space.x, space.y)).length;
  }

  private isOnEdge(x: number, y: number): boolean {
    if (y === 0) return true;
    if (y === 8) return true;
    if (x === 8) return true;
    if (x === (Math.abs(4-y))) return true;
    return false;
  }
}
