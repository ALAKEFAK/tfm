import {IMilestone} from './../IMilestone';
import {Player} from '../../Player';
import {TileType} from '../../TileType';
import {MoonExpansion} from '../../moon/MoonExpansion';
import {isAresTile} from '../../TileType';

export class Pioneer implements IMilestone {
    public name: string = 'Pioneer';
    public description: string = 'Owning at least 5 tiles'
    public getScore(player: Player): number {
      const marsSpaces = player.game.board.spaces.filter(
        // Don't simplifiy this to "space.tile?.tileType !== TileType.OCEAN" because that will make
        // Land Claim a valid space for Landlord.
        (space) => space.tile !== undefined && isAresTile(space.tile.tileType) === false && space.tile.tileType !== TileType.OCEAN && space.player === player).length;

      const moonSpaces: number = MoonExpansion.ifElseMoon(player.game,
        (moonData) => moonData.moon.spaces.filter(
          (space) => space.tile !== undefined && space.player === player).length,
        () => 0);

      return marsSpaces + moonSpaces;
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 5;
    }
}
