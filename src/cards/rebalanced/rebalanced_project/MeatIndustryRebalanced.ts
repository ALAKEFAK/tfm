import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';

export class MeatIndustryRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MEAT_INDUSTRY_REBALANCED,
      tags: [Tags.BUILDING],
      cost: 10,

      metadata: {
        cardNumber: 'X25',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you gain an animal to ANY CARD, gain 2 M€.', (eb) => {
            eb.animals(1).asterix().startEffect.megacredits(2);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }
}
