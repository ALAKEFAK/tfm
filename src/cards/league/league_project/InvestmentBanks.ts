import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class InvestmentBanks extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      name: CardName.INVESTMENT_BANKS,
      cardType: CardType.AUTOMATED,

      metadata: {
        cardNumber: 'L409',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(4));
        }),
        description: 'Increase your M€ production 4 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 4);
    return undefined;
  }
}
