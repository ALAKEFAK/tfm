import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {DecreaseAnyProduction} from '../../../deferredActions/DecreaseAnyProduction';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';

export class HeatTrappersRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.HEAT_TRAPPERS_REBALANCED,
      tags: [Tags.ENERGY, Tags.BUILDING],
      cost: 6,

      requirements: CardRequirements.builder((b) => b.temperature(-22)),
      metadata: {
        cardNumber: '178',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().heat(2).any.br;
            pb.plus().energy(1);
          });
        }),
        description: 'Requires -22 C or warmer. Decrease any heat production 2 steps and increase your Energy production 1 step.',
        victoryPoints: -1,
      },
    });
  }

  public warning?: string;

  public canPlay(player: Player): boolean {
    this.warning = undefined;
    if (super.canPlay(player) && player.game.someoneElseHasResourceProduction(Resources.HEAT, 2, player) === false) {
      this.warning = 'You will have to decrease your own heat production because no other player has enough.';
    }
    return super.canPlay(player) && player.game.someoneHasResourceProduction(Resources.HEAT, 2);
  }

  public produce(player: Player) {
    player.game.defer(new DecreaseAnyProduction(player, Resources.HEAT, 2));
    player.addProduction(Resources.ENERGY, 1);
  }

  public play(player: Player) {
    this.produce(player);
    return undefined;
  }
  public getVictoryPoints() {
    return -1;
  }
}
