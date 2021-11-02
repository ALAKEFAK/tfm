import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {IProjectCard} from '../../IProjectCard';

export class PolyphemosRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS_REBALANCED,
      startingMegaCredits: 55,
      cardType: CardType.CORPORATION,
      cardCost: 5,

      metadata: {
        cardNumber: 'R11',
        description: 'You start with 55 M€. Increase your M€ production 5 steps. Gain 5 titanium.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(55).nbsp.production((pb) => pb.megacredits(5)).nbsp.titanium(5).digit;
          b.corpBox('effect', (ce) => {
            ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand.', (eb) => {
              eb.cards(1).asterix().startEffect.megacredits(5);
            });
            ce.effect('When playing a card with a basic cost of 20MC or more, draw a card.', (eb) => {
              eb.megacredits(20).asterix().startEffect.cards(1);
            });
          });
        }),
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 5);
    player.titanium = 5;
    return undefined;
  }
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.corporationCard !== undefined && player.corporationCard.name === this.name && card.cost >= 20) {
      player.drawCard();
    }
  }
}
