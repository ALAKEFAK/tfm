import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class MoholeRebalanced extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE_REBALANCED,
      tags: [Tags.BUILDING],
      productionBox: Units.of({heat: 2, energy: 1}),

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(2).energy(1)).br;
          b.energy(3).br;
          b.heat(5);
        }),
        description: 'Increase your heat production 2 steps and energy production 1 step. Gain 3 energy and 5 heat.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.HEAT, 2);
    player.addProduction(Resources.ENERGY, 1);
    player.energy += 3;
    player.heat +=5;
    return undefined;
  }
}
