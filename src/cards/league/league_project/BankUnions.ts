import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class BankUnions extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 8,
      name: CardName.BANK_UNIONS,
      cardType: CardType.AUTOMATED,

      metadata: {
        cardNumber: 'L405',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3));
        }),
        description: 'Increase your M€ production 3 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 3);
    return undefined;
  }
}
