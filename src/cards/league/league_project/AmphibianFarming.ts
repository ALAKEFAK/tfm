import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';

export class AmphibianFarming extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 7,
      tags: [Tags.PLANT],
      name: CardName.AMPHIBIAN_FARMING,
      cardType: CardType.AUTOMATED,

      requirements: CardRequirements.builder((b) => b.oceans(2).max()),
      metadata: {
        cardNumber: 'L406',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1));
        }),
        description: 'Requires 2 or less ocean tiles. Increase your Plant production 1 step.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }
}
