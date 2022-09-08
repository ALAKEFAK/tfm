import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {Priority} from '../../../deferredActions/DeferredAction';
import {DrawCards} from '../../../deferredActions/DrawCards';

export class SaveOurShip extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.SAVE_OUR_SHIP,
      cost: 0,

      metadata: {
        cardNumber: 'L419',
        description: 'Discard 2 cards, then draw 3 cards.',
        renderData: CardRenderer.builder((b) => {
          b.minus().cards(2).br;
          b.plus().cards(3);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    // Only playable if you have 2 cards to discard + this card in hand
    return super.canPlay(player) && player.cardsInHand.length > 2;
  }

  public play(player: Player) {
    player.game.defer(new DiscardCards(player, this.name, 2), Priority.DISCARD_BEFORE_DRAW);
    player.game.defer(DrawCards.keepAll(player, 3));
    return undefined;
  }
}
