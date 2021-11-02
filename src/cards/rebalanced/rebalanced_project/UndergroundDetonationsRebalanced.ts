import {IActionCard} from '../../ICard';
import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {CardRenderer} from '../../render/CardRenderer';

export class UndergroundDetonationsRebalanced extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.UNDERGROUND_DETONATIONS_REBALANCED,
      tags: [Tags.BUILDING],
      cost: 2,

      metadata: {
        cardNumber: '202',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 8M€ to increase your heat production 2 steps. STEEL MAY BE USED as if you were playing a Building card.', (eb) => {
            eb.megacredits(8).steel(1).brackets.startAction.production((pb)=>pb.heat(2));
          });
        }),
      },
    });
  }

  public canAct(player: Player): boolean {
    const actionCost = 8;
    return player.canAfford(actionCost, {steel: true});
  }

  public action(player: Player) {
    player.game.defer(new SelectHowToPayDeferred(player, 8, {canUseSteel: true, title: 'Select how to pay for action'}));
    player.addProduction(Resources.HEAT, 2);
    return undefined;
  }
  public play() {
    return undefined;
  }
}
