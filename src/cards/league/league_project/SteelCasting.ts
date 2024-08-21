import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class SteelCasting extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 3,
      name: CardName.STEEL_CASTING,
      cardType: CardType.AUTOMATED,

      metadata: {
        cardNumber: 'L408',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1));
        }),
        description: 'Increase your Steel production 1 step.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }
}
