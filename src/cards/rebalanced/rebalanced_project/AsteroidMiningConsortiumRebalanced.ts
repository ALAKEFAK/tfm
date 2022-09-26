import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {DecreaseAnyProduction} from '../../../deferredActions/DecreaseAnyProduction';
import {CardRequirements} from '../../CardRequirements';
import {CardRenderer} from '../../render/CardRenderer';

export class AsteroidMiningConsortiumRebalanced extends Card implements IProjectCard {
  public warning?: string;

  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ASTEROID_MINING_CONSORTIUM_REBALANCED,
      tags: [Tags.JOVIAN],
      cost: 13,

      requirements: CardRequirements.builder((b) => b.generation(4)),
      metadata: {
        description: 'Requires that you have titanium production. Decrease any titanium production 1 step and increase your own 1 step.',
        cardNumber: '002',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().titanium(-1).any.br;
            pb.plus().titanium(1);
          });
        }),
        victoryPoints: 1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (!super.canPlay(player)) {
      return false;
    }
    this.warning = undefined;
    if (super.canPlay(player) && !player.game.someoneElseHasResourceProduction(Resources.TITANIUM, 1, player)) {
      this.warning = 'You will have to decrease your own titanium production because no other player has enough.';
    }
    return true;
  }

  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    player.game.defer(new DecreaseAnyProduction(player, Resources.TITANIUM, 1));
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
