import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {DecreaseAnyProduction} from '../../../deferredActions/DecreaseAnyProduction';
import {CardRequirements} from '../../CardRequirements';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';

export class CloudSeedingRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.CLOUD_SEEDING_REBALANCED,
      tags: [Tags.PLANT],
      cost: 11,

      requirements: CardRequirements.builder((b) => b.oceans(3)),
      metadata: {
        cardNumber: '004',
        description: 'Requires 3 ocean tiles. Decrease your M€ production 1 step and any heat production 1 step. Increase your Plant production 2 steps.',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.minus().megacredits(1).heat(1).any.br;
          pb.plus().plants(2);
        })),
      },
    });
  }

  public warning?: string;

  public canPlay(player: Player): boolean {
    this.warning = undefined;
    if (super.canPlay(player) && player.game.someoneElseHasResourceProduction(Resources.HEAT, 1, player) === false) {
      this.warning = 'You will have to decrease your own heat production because no other player has enough.';
    }
    return player.getProduction(Resources.MEGACREDITS) > -5 &&
        super.canPlay(player) &&
        player.game.someoneHasResourceProduction(Resources.HEAT, 1);
  }

  public play(player: Player) {
    player.game.defer(new DecreaseAnyProduction(player, Resources.HEAT, 1));
    player.addProduction(Resources.MEGACREDITS, -1);
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }
}
