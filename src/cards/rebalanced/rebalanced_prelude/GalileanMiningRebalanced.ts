import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class GalileanMiningRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.GALILEAN_MINING_REBALANCED,
      tags: [Tags.JOVIAN],

      metadata: {
        cardNumber: 'P13',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.titanium(2);
          }).br;
        }),
        description: 'Increase your titanium production 2 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 2);
    return undefined;
  }
}
