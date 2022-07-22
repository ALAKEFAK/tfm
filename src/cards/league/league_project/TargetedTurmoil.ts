import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {OrOptions} from '../../../inputs/OrOptions';
import {
  MAX_OCEAN_TILES,
  MAX_OXYGEN_LEVEL,
  MAX_TEMPERATURE,
  MAX_VENUS_SCALE,
  MIN_OXYGEN_LEVEL,
  MIN_TEMPERATURE,
  MIN_VENUS_SCALE,
} from '../../../constants';
import {SelectOption} from '../../../inputs/SelectOption';
import {RemoveOceanTile} from '../../../deferredActions/RemoveOceanTile';

export class TargetedTurmoil extends Card implements IProjectCard {
  // author: Dids
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.TARGETED_TURMOIL,
      cost: 0,
      tags: [Tags.SPACE],

      metadata: {
        cardNumber: 'L307',
        renderData: CardRenderer.builder((b) => {
          b.minus().tr(1).br;
          b.minus().temperature(1).or().oceans(1).or().br.oxygen(1).or().venus(1);
        }),
        description: 'Reduce your TR by one. Decrease any non-maxed global parameter by one.',
      },
    });
  }

  public play(player: Player) {
    player.decreaseTerraformRating();
    const orOptions = new OrOptions();

    if (player.game.getTemperature() !== MIN_TEMPERATURE && player.game.getTemperature() < MAX_TEMPERATURE) {
      orOptions.options.push(new SelectOption('Decrease Temperature', 'Decrease Temperature', () => {
        player.game.increaseTemperature(player.game.getPlayers()[0], -1);
        return undefined;
      }));
    }

    if (player.game.getOxygenLevel() !== MIN_OXYGEN_LEVEL && player.game.getOxygenLevel() !== MAX_OXYGEN_LEVEL) {
      orOptions.options.push(new SelectOption('Decrease Oxygen level', 'Decrease O2', () => {
        player.game.increaseOxygenLevel(player.game.getPlayers()[0], -1);
        return undefined;
      }));
    }

    const oceansPlaced = player.game.board.getOceansOnBoard();
    if (oceansPlaced > 0 && oceansPlaced !== MAX_OCEAN_TILES) {
      orOptions.options.push(new SelectOption('Remove Ocean', 'Remove Ocean', () => {
        player.game.defer(new RemoveOceanTile(player, 'Targeted Turmoil - Remove an Ocean tile from the board'));
        return undefined;
      }));
    }

    if (player.game.gameOptions.venusNextExtension &&
      player.game.getVenusScaleLevel() !== MIN_VENUS_SCALE &&
      player.game.getVenusScaleLevel() !== MAX_VENUS_SCALE) {
      orOptions.options.push(new SelectOption('Decrease Venus level', 'Decrease Venus', () => {
        player.game.increaseVenusScaleLevel(player.game.getPlayers()[0], -1);
        return undefined;
      }));
    }

    if (orOptions.options.length === 1) return orOptions.options[0].cb();
    return orOptions;
  }
}
