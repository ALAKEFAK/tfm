import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class BiosphereSupportRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOSPHERE_SUPPORT_REBALANCED,
      tags: [Tags.PLANT],

      metadata: {
        cardNumber: 'P05',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plants(2).megacredits(1);
          });
        }),
        description: 'Increase your plant production 2 steps and M€ production 1 step.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }
}

