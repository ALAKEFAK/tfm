import {Tags} from '../Tags';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SmeltingPlant extends PreludeCard {
  constructor() {
    super({
      name: CardName.SMELTING_PLANT,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'P30',
        renderData: CardRenderer.builder((b) => {
          b.oxygen(3);
        }),
        description: 'Raise oxygen 3 steps.',
      },
    });
  }
  public play(player: Player) {
    player.game.increaseOxygenLevel(player, 1);
    return player.game.increaseOxygenLevel(player, 2);
  }
}
