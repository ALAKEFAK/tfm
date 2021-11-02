import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class BiofuelsRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOFUELS_REBALANCED,
      tags: [Tags.MICROBE, Tags.ENERGY],

      metadata: {
        cardNumber: 'P03',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(2).plants(1)).br;
          b.plants(2);
        }),
        description: 'Increase your energy by two steps and plant production 1 step. Gain 2 plants.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 2);
    player.addProduction(Resources.PLANTS, 1);
    player.plants += 2;
    return undefined;
  }
}

