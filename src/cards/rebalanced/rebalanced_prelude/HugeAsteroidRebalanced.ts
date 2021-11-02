import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class HugeAsteroidRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.HUGE_ASTEROID_REBALANCED,

      metadata: {
        cardNumber: 'P15',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3);
        }),
        description: 'Increase Temperature 3 steps.',
      },
    });
  }
  public play(player: Player) {
    player.game.increaseTemperature(player, 3);
    return undefined;
  }
}
