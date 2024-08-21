import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../../constants';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {CardRenderer} from '../../render/CardRenderer';
import {TileType} from '../../../TileType';
import {SelectSpace} from '../../../inputs/SelectSpace';
import {ISpace} from '../../../boards/ISpace';
import {SpaceType} from '../../../SpaceType';

export class PhobosFalls extends Card implements IProjectCard {
  // markanarmi
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.PHOBOS_FALLS,
      tags: [Tags.SPACE],
      cost: 45,

      metadata: {
        cardNumber: 'L414',
        description: 'Raise temperature 3 steps and gain 4 titanium. Remove ANY greenery tile and replace it with the special tile. Cannot be played if PHOBOS SPACE HAVEN is in play.',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3).br;
          b.tile(TileType.PHOBOS_FALLS, true).asterix().br;
          b.titanium(4);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    // Only playable if Phobos Space Haven has not been played yet
    if (player.game.getPlayers().some((p) => p.cardIsInEffect(CardName.PHOBOS_SPACE_HAVEN_LEAGUE))) return false;

    const remainingTemperatureSteps = (MAX_TEMPERATURE - player.game.getTemperature()) / 2;
    const stepsRaised = Math.min(remainingTemperatureSteps, 3);

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST * stepsRaised, {titanium: true});
    }

    return true;
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, 3);
    player.titanium += 4;

    const availableSpaces = this.getAvailableSpaces(player);
    if (availableSpaces.length > 0) {
      return new SelectSpace('Select space for tile', availableSpaces, (foundSpace: ISpace) => {
        player.game.removeTile(foundSpace.id);
        player.game.addTile(player, foundSpace.spaceType, foundSpace, {tileType: TileType.PHOBOS_FALLS});
        return undefined;
      });
    }
    return undefined;
  }

  private getAvailableSpaces(player: Player): Array<ISpace> {
    return player.game.board.getSpaces(SpaceType.LAND, player)
      .filter((space) => space.tile !== undefined && space.tile.tileType === TileType.GREENERY);
  }
}
