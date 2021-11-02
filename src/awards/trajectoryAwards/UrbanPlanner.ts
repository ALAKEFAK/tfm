import {IAward} from './../IAward';
import {Player} from '../../Player';
import {TileType} from '../../TileType';
import {Board} from '../../boards/Board';

export class UrbanPlanner implements IAward {
  public name: string = 'Urban Planner';
  public description: string = 'Having the most VP from city TILES on Mars (NOT including VP from city CARDS)'
  public getScore(player: Player): number {
    let score = 0;
    // Victory points from board
    player.game.board.spaces.forEach((space) => {
      // Victory points for greenery tiles adjacent to cities
      if (Board.isCitySpace(space) && space.player !== undefined && space.player.id === player.id) {
        const adjacent = player.game.board.getAdjacentSpaces(space);
        for (const adj of adjacent) {
          if (adj.tile && adj.tile.tileType === TileType.GREENERY) {
            score++;
          }
        }
      }
    });
    return score;
  }
}
