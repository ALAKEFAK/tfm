import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Tags} from '../../Tags';
import {IProjectCard} from '../../IProjectCard';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {Size} from '../../render/Size';
import {CardRenderer} from '../../render/CardRenderer';

export class EnergySavingRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.ENERGY_SAVING_REBALANCED,
      tags: [Tags.ENERGY, Tags.BUILDING],
      cost: 15,

      metadata: {
        cardNumber: '189',
        description: 'Increase your Energy production 1 step for each City tile in play.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1).slash().city(Size.SMALL).any);
        }),
      },
    });
  }

  public produce(player: Player) {
    player.addProduction(Resources.ENERGY, player.game.getCitiesInPlay(), {log: true});
  }

  public play(player: Player) {
    this.produce(player);
    return undefined;
  }
}
