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
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R43',
        description: 'As first action, draw 3 cards.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(40).nbsp.cards(3);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('Cards with a req. cost 2 M€ less.', (eb) => {
              eb.cards(1).secondaryTag(AltSecondaryTag.REQ).startEffect.megacredits(-2);
            });
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +/-2 steps.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 2');
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
    if (card.requirements !== undefined) return 2;
    return 0;
  }

  public getRequirementBonus(): number {
    return 2;
  }

  public play() {
    return undefined;
  }
}

