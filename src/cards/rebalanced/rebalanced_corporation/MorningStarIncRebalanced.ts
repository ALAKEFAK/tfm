import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {GlobalParameter} from '../../../GlobalParameter';
import {IProjectCard} from '../../IProjectCard';
import {Size} from '../../render/Size';

export class MorningStarIncRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.MORNING_STAR_INC_REBALANCED,
      tags: [Tags.VENUS],
      startingMegaCredits: 47,
      cardType: CardType.CORPORATION,
      initialActionText: 'Draw 3 Venus-tag cards',
      cardDiscount: {tag: Tags.VENUS, amount: 1},
      metadata: {
        cardNumber: 'R06',
        description: 'You start with 47 M€. As your first action, reveal cards from the deck until you have revealed 3 Venus-tag cards. Take those into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(47).nbsp.cards(3).secondaryTag(Tags.VENUS);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('Your Venus requirements are +/- 3 steps, your choice in each case.', (eb) => {
              eb.plate('Venus requirements').startEffect.text('+/- 3');
            });
            ce.effect('When you play a Venus tag, you pay 1 M€ less for it.', (eb)=> {
              eb.venus(1).played.startEffect.megacredits(-1);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(3, {tag: Tags.VENUS});
    return undefined;
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    return card.tags.filter((tag) => tag === Tags.VENUS).length * 2;
  }

  public getRequirementBonus(_player: Player, parameter: GlobalParameter): number {
    return parameter === GlobalParameter.VENUS ? 3 : 0;
  }

  public play() {
    return undefined;
  }
}
