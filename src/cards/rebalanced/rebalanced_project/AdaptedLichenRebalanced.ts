import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class AdaptedLichenRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ADAPTED_LICHEN_REBALANCED,
      tags: [Tags.PLANT],
      cost: 11,

      metadata: {
        description: 'Increase your M€ and Plant production 1 step each.',
        cardNumber: '048',
        renderData: CardRenderer.builder((b) => b.production((pb) => pb.megacredits(1).plants(1))),
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }
}
