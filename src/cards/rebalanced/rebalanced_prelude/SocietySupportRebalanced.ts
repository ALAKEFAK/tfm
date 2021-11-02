import {Player} from '../../../Player';
import {PreludeCard} from './../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {Units} from '../../../Units';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';

export class SocietySupportRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.SOCIETY_SUPPORT_REBALANCED,
      tags: [Tags.WILDCARD],
      productionBox: Units.of({plants: 1, heat: 1, energy: 1}),
      metadata: {
        cardNumber: 'P31',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plants(1).energy(1).heat(1);
          }).br;
          b.megacredits(-3);
        }),
        description: 'Increase your plant, energy and heat production 1 step. Pay 3 M€.',
      },
    });
  }
  public canPlay(player: Player) {
    return player.canAfford(3);
  }
  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    player.addProduction(Resources.ENERGY, 1);
    player.addProduction(Resources.HEAT, 1);
    player.game.defer(new SelectHowToPayDeferred(player, 3));
    return undefined;
  }
}
