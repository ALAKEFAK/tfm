import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {MAX_OCEAN_TILES, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../../constants';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {CardRenderer} from '../../render/CardRenderer';
import {PlaceOceanTile} from '../../../deferredActions/PlaceOceanTile';
import {Resources} from '../../../Resources';

export class AnonymousEventTwo extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.ANONYMOUS_EVENT_TWO,
      tags: [Tags.EARTH, Tags.SPACE],
      cost: 28,

      metadata: {
        description: 'Raise temperature 1 step, raise oxygen 1 step and place an ocean tile. Remove up to 3 plants from EACH opponent.',
        cardNumber: 'L412',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).oxygen(1).oceans(1).br;
          b.minus().plants(-3).any.asterix();
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const temperatureSteps = player.game.getTemperature() < MAX_TEMPERATURE ? 1 : 0;
    const oxygenSteps = player.game.getTemperature() < MAX_OXYGEN_LEVEL ? 1 : 0;
    const oceansSteps = player.game.board.getOceansOnBoard() < MAX_OCEAN_TILES ? 1 : 0;
    const totalSteps = temperatureSteps + oxygenSteps + oceansSteps;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + totalSteps * REDS_RULING_POLICY_COST, {titanium: true});
    }

    return true;
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, 1);
    player.game.increaseOxygenLevel(player, 1);
    player.game.defer(new PlaceOceanTile(player));
    player.game.getPlayers().forEach((p) => {
      if (p.id !== player.id) p.deductResource(Resources.PLANTS, 3, {log: true, from: player});
    });
    return undefined;
  }
}
