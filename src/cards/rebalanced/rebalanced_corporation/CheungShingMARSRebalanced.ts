import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {CorporationCard} from './../../corporation/CorporationCard';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';
import {Size} from '../../render/Size';

export class CheungShingMARSRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.CHEUNG_SHING_MARS_REBALANCED,
      tags: [Tags.BUILDING, Tags.SPACE],
      startingMegaCredits: 42,
      productionBox: Units.of({megacredits: 3}),

      cardDiscount: {tag: Tags.BUILDING, amount: 2},
      metadata: {
        cardNumber: 'R16',
        description: 'You start with 3 M€ production and 42 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.megacredits(3)).nbsp.megacredits(42);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('When you play a building tag, you pay 2 M€ less for it.', (eb) => {
              eb.building().played.startEffect.megacredits(-2);
            });
            ce.effect('When you play a space tag, you pay 1 M€ less for it.', (eb) => {
              eb.space().played.startEffect.megacredits(-1);
            });
          });
        }),
      },
    });
  }


  public getCardDiscount(_player: Player, card: IProjectCard) {
    const buildingDiscount = card.tags.filter((tag) => tag === Tags.BUILDING).length * 2;
    const spaceDiscount = card.tags.filter((tag) => tag === Tags.SPACE).length * 1;
    return buildingDiscount + spaceDiscount;
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 3);
    return undefined;
  }
}
