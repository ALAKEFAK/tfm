import {Card} from '../../Card';
import {CorporationCard} from './../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {AltSecondaryTag} from '../../render/CardRenderItem';
import {Size} from '../../render/Size';
import {IProjectCard} from '../../IProjectCard';

export class InventrixRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.INVENTRIX_REBALANCED,
      tags: [Tags.SCIENCE],
      initialActionText: 'Draw 3 cards',
      startingMegaCredits: 45,

      metadata: {
        cardNumber: 'R43',
        description: 'As first action, draw 3 cards.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(45).nbsp.cards(3);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +/-3 steps.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 3');
            });
            ce.effect('Cards with a req. cost 1 M€ less.', (eb) => {
              eb.cards(1).secondaryTag(AltSecondaryTag.REQ).startEffect.megacredits(-1);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(3);
    return undefined;
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    if (card.requirements !== undefined) return 1;
    return 0;
  }

  public getRequirementBonus(): number {
    return 3;
  }

  public play() {
    return undefined;
  }
}

