import {Card} from '../../Card';
import {CorporationCard} from './../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {IProjectCard} from '../../IProjectCard';
import {Player} from '../../../Player';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class InterplanetaryCinematicsRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.INTERPLANETARY_CINEMATICS_REBALANCED,
      tags: [Tags.BUILDING],
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R19',
        description: 'You start with 40 M€ and 12 steel.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(40).nbsp.steel(12).digit;
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play an event, you gain 3 M€.', (eb) => {
              eb.event().played.startEffect.megacredits(3);
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.corporationCard !== undefined && player.corporationCard.name === this.name && card.cardType === CardType.EVENT) {
      player.megaCredits += 3;
    }
  }
  public play(player: Player) {
    player.steel = 12;
    return undefined;
  }
}
