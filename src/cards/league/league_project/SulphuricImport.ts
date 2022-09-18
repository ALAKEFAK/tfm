import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {MAX_TEMPERATURE, MAX_VENUS_SCALE, REDS_RULING_POLICY_COST} from '../../../constants';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {CardRenderer} from '../../render/CardRenderer';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {ResourceType} from '../../../ResourceType';
import {RemoveResourcesFromCard} from '../../../deferredActions/RemoveResourcesFromCard';
import {RemoveAnyPlants} from '../../../deferredActions/RemoveAnyPlants';
import {SelectCard} from '../../../inputs/SelectCard';
import {ICard} from '../../ICard';

export class SulphuricImport extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.SULPHURIC_IMPORT,
      tags: [Tags.SPACE],
      cost: 11,

      metadata: {
        description: 'Raise Venus 1 step OR raise temperature 1 step. Remove up to 3 plants, 3 microbes or 2 animals from ANOTHER CARD owned by ANY player.',
        cardNumber: 'L413',
        renderData: CardRenderer.builder((b) => {
          b.venus(1).or().temperature(1).br;
          b.minus().plants(-3).digit.slash().microbes(3).digit.any.asterix().slash().animals(2).digit.any.asterix();
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const temperatureSteps = player.game.getTemperature() < MAX_TEMPERATURE ? 1 : 0;
    const venusMaxed = player.game.getVenusScaleLevel() < MAX_VENUS_SCALE ? 1 : 0;
    const totalSteps = Math.max(temperatureSteps, venusMaxed);

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + totalSteps * REDS_RULING_POLICY_COST, {titanium: true});
    }

    return true;
  }

  public play(player: Player) {
    const game = player.game;
    const availableMicrobeCards = RemoveResourcesFromCard.getAvailableTargetCards(player, ResourceType.MICROBE);
    const availableAnimalCards = RemoveResourcesFromCard.getAvailableTargetCards(player, ResourceType.ANIMAL);

    const temperatureSteps = player.game.getTemperature() < MAX_TEMPERATURE ? 1 : 0;
    const venusSteps = player.game.getVenusScaleLevel() < MAX_VENUS_SCALE ? 1 : 0;
    const totalSteps = temperatureSteps + venusSteps;

    // Step 2: Get Plant / Microbe / Animal removal option
    const removePlants = function() {
      player.game.defer(new RemoveAnyPlants(player, 3));
      return undefined;
    };

    const availableRemovalActions: Array<SelectOption | SelectCard<ICard>> = [];

    const removePlantsOption = new SelectOption('Remove 3 plants', 'Remove plants', removePlants);
    availableRemovalActions.push(removePlantsOption);

    if (availableMicrobeCards.length > 0) {
      availableRemovalActions.push(new SelectOption('Remove 3 microbes from a card', 'Remove microbes', () => {
        player.game.defer(new RemoveResourcesFromCard(player, ResourceType.MICROBE, 3));
        return undefined;
      }));
    }

    if (availableAnimalCards.length > 0) {
      availableRemovalActions.push(new SelectOption('Remove 2 animals from a card', 'Remove animals', () => {
        player.game.defer(new RemoveResourcesFromCard(player, ResourceType.ANIMAL, 2));
        return undefined;
      }));
    }

    // Step 1: Choose Temp or Venus bump
    const increaseTemp = new SelectOption('Raise temperature 1 step', 'Raise temperature', () => {
      game.increaseTemperature(player, 1);
      player.game.log('${0} increased Temperature 1 step', (b) => b.player(player));
      return new OrOptions(...availableRemovalActions);
    });

    const increaseVenus = new SelectOption('Raise Venus 1 step', 'Raise venus', () => {
      game.increaseVenusScaleLevel(player, 1);
      player.game.log('${0} increased Venus 1 step', (b) => b.player(player));
      return new OrOptions(...availableRemovalActions);
    });

    const increaseTempOrVenus = new OrOptions(increaseTemp, increaseVenus);
    increaseTempOrVenus.title = 'Choose global parameter to raise';

    // Select what to do
    switch (totalSteps) {
    case 0:
      return new OrOptions(...availableRemovalActions);
    case 1:
      if (temperatureSteps === 0) {
        game.increaseVenusScaleLevel(player, 1);
        player.game.log('${0} increased Venus 1 step', (b) => b.player(player));
      } else {
        game.increaseTemperature(player, 1);
        player.game.log('${0} increased Temperature 1 step', (b) => b.player(player));
      }
      return new OrOptions(...availableRemovalActions);
    default:
      return increaseTempOrVenus;
    }
  }
}
