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

export class CheungShingMARSRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.CHEUNG_SHING_MARS_REBALANCED,
      tags: [Tags.BUILDING],
      startingMegaCredits: 44,
      productionBox: Units.of({megacredits: 3}),

      metadata: {
        cardNumber: 'R16',
        description: 'You start with 3 M€ production and 44 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.megacredits(3)).nbsp.megacredits(44);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a building tag, including this, you gain 2 M€.', (eb) => {
              eb.building().played.startEffect.megacredits(2);
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (card.tags.includes(Tags.BUILDING)) {
      player.megaCredits += 2;
    }
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    const spaceDiscount = card.tags.filter((tag) => tag === Tags.SPACE).length * 1;
    const buildingDiscount = card.tags.filter((tag) => tag === Tags.BUILDING).length * 2;
    return spaceDiscount + buildingDiscount;
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 3);
    return undefined;
  }
}
