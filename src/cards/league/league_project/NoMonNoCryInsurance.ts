import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {Player} from '../../../Player';

export class NoMonNoCryInsurance extends Card implements IProjectCard {
  // author: markanarmi
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.NOMON_NOCRY_INSURANCE,
      cost: 2,
      tags: [Tags.EARTH],

      metadata: {
        cardNumber: 'L410',
        renderData: CardRenderer.builder((b) => {
          b.effect('When your production is reduced, any resources are taken from you or one of your delegates is removed, gain 3 M€.', (eb) => {
            eb.minus().production((pb) => pb.wild(1)).slash().wild(1).slash().delegates(1).startEffect.megacredits(3);
          }).br;
          b.production((pb) => pb.megacredits(-1));
        }),
        description: 'Reduce your M€ production 1 step.',
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.MEGACREDITS) >= -4;
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, -1);
    return undefined;
  }
}
