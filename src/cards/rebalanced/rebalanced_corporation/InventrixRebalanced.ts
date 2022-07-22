import {Card} from '../../Card';
import {CorporationCard} from './../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';

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
        description: 'As your first action in the game, draw 3 cards. Start with 45 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(45).nbsp.cards(3);
          b.corpBox('effect', (ce) => {
            ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +4 or -4 steps, your choice in each case.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 4');
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
  public getRequirementBonus(): number {
    return 4;
  }
  public play() {
    return undefined;
  }
}

