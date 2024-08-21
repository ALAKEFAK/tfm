import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../../constants';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {CardRenderer} from '../../render/CardRenderer';
import {ResourceType} from '../../../ResourceType';
import {SelectCard} from '../../../inputs/SelectCard';
import {ICard} from '../../ICard';

export class DactylAndIda extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.DACTYL_AND_IDA,
      tags: [Tags.SPACE],
      cost: 18,

      metadata: {
        description: 'Raise temperature 1 step and raise oxygen 1 step. Add 2 asteroid resources to ANY card.',
        cardNumber: 'L411',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).oxygen(1).br;
          b.asteroids(2).asterix();
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const temperatureMaxed = player.game.getTemperature() < MAX_TEMPERATURE ? 1 : 0;
    const oxygenMaxed = player.game.getTemperature() < MAX_OXYGEN_LEVEL ? 1 : 0;
    const totalSteps = temperatureMaxed + oxygenMaxed;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + totalSteps * REDS_RULING_POLICY_COST, {titanium: true});
    }

    return true;
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, 1);
    player.game.increaseOxygenLevel(player, 1);
    const asteroidCards = player.getResourceCards(ResourceType.ASTEROID);

    if (asteroidCards.length === 0) return undefined;

    const addAsteroids = new SelectCard(
      'Select card to add 2 asteroids',
      'Add asteroids',
      asteroidCards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], {qty: 2, log: true});
        return undefined;
      },
    );

    if (asteroidCards.length === 1) {
      player.addResourceTo(asteroidCards[0], {qty: 2, log: true});
      return undefined;
    } else {
      return addAsteroids;
    }
  }
}
