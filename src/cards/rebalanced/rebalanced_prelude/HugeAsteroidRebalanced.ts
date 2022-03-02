import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {SelectHowToPayDeferred} from '../../deferredActions/SelectHowToPayDeferred';


export class HugeAsteroidRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.HUGE_ASTEROID_REBALANCED,

      metadata: {
        cardNumber: 'P15',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3);
          b.megacredits(-2);
        }),
        description: 'Increase Temperature 3 steps. Pay 2 MC.',
      },
    });
  }
  public play(player: Player) {
    player.game.increaseTemperature(player, 3);
    player.game.defer(new SelectHowToPayDeferred(player, 2));
    return undefined;
  }
}
