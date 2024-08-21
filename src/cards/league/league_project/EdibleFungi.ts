import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';

export class EdibleFungi extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      tags: [Tags.MICROBE],
      name: CardName.EDIBLE_FUNGI,
      cardType: CardType.AUTOMATED,

      requirements: CardRequirements.builder((b) => b.tag(Tags.MICROBE, 1)),
      metadata: {
        cardNumber: 'L403',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(2));
        }),
        description: 'Requires 1 Microbe tag. Increase your Plant production 2 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }
}
