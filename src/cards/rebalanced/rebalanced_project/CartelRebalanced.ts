import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class CartelRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.CARTEL_REBALANCED,
      tags: [Tags.EARTH],
      cost: 10,

      metadata: {
        cardNumber: '137',
        description: 'Increase your M€ production 1 step for each Earth tag you have, including this.',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.megacredits(1).slash().earth().played;
        })),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, player.getTagCount(Tags.EARTH) + 1, {log: true});
    return undefined;
  }
}
