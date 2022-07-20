import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class SmeltingPlantRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.SMELTING_PLANT_REBALANCED,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'P30',
        renderData: CardRenderer.builder((b) => {
          b.oxygen(2).br;
          b.steel(4).br;
          b.effect(undefined, (eb) => {
            eb.empty().startAction.cards(1).secondaryTag(Tags.BUILDING);
          });
        }),
        description: 'Raise oxygen 2 steps. Gain 4 steel. Draw 1 building card.',
      },
    });
  }
  public play(player: Player) {
    player.steel += 4;
    player.game.increaseOxygenLevel(player, 2);
    player.drawCard(1, {tag: Tags.BUILDING});
    return undefined;
  }
}
