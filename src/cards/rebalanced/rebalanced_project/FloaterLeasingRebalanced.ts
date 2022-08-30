import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {ResourceType} from '../../../ResourceType';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class FloaterLeasingRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 3,
      name: CardName.FLOATER_LEASING_REBALANCED,
      cardType: CardType.AUTOMATED,

      metadata: {
        cardNumber: 'C10',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1)).slash().floaters(2).digit;
        }),
        description: 'Increase your M€ production 1 step PER 2 floaters you have (max 10).',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, Math.min(Math.floor(player.getResourceCount(ResourceType.FLOATER) / 2), 10), {log: true});
    return undefined;
  }
}

