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

export class EnergyTappingRebalanced extends Card implements IProjectCard {
  public warning?: string;

  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ENERGY_TAPPING_REBALANCED,
      tags: [Tags.ENERGY],
      cost: 3,

      requirements: CardRequirements.builder((b) => b.generation(6)),
      metadata: {
        cardNumber: '201',
        description: 'Decrease any Energy production 1 step and increase your own 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).any.br;
            pb.plus().energy(1);
          });
        }),
        victoryPoints: -1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (!super.canPlay(player)) {
      return false;
    }
    this.warning = undefined;
    if (super.canPlay(player) && !player.game.someoneElseHasResourceProduction(Resources.ENERGY, 1, player)) {
      this.warning = 'You will have to decrease your own energy production because no other player has enough.';
    }
    return true;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    player.game.defer(new DecreaseAnyProduction(player, Resources.ENERGY, 1));
    return undefined;
  }

  public getVictoryPoints() {
    return -1;
  }
}
