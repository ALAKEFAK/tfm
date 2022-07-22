import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class OrbitalConstructionYardRebalanced extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.ORBITAL_CONSTRUCTION_YARD_REBALANCED,
      tags: [Tags.SPACE],

      metadata: {
        cardNumber: 'P25',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1)).br;
          b.titanium(5);
        }),
        description: 'Increase your titanium production 1 step. Gain 5 titanium.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    player.titanium += 5;
    return undefined;
  }
}
