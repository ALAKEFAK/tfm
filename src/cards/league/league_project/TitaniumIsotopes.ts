import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class TitaniumIsotopes extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      tags: [Tags.SPACE],
      name: CardName.TITANIUM_ISOTOPES,
      cardType: CardType.AUTOMATED,

      metadata: {
        cardNumber: 'L407',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1));
        }),
        description: 'Increase your Titanium production 1 step.',
        victoryPoints: 1,
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
