import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {isAresTile} from '../../TileType';

export class Tropicalist implements IMilestone {
    public name: string = 'Tropicalist';
    public description: string = 'Owning at least 3 tiles on the equator (the middle three rows)'
    public getScore(player: Player): number {
      return player.game.board.spaces
        .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            isAresTile(space.tile.tileType) === false &&
            space.y >= 3 && space.y <= 5).length;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 3;
    }
}
