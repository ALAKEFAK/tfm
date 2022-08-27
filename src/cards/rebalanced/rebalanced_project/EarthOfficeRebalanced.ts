import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class EarthOfficeRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.EARTH_OFFICE_REBALANCED,
      tags: [Tags.EARTH],
      cost: 4,

      cardDiscount: {tag: Tags.EARTH, amount: 3},
      metadata: {
        cardNumber: '105',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play an Earth card, you pay 3 M€ less for it.', (eb) => {
            eb.earth().played.startEffect.megacredits(-3);
          });
        }),
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.EARTH).length * 3;
  }

  public play() {
    return undefined;
  }
}
