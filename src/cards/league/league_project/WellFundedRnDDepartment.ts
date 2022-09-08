import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Player} from '../../../Player';
import {CardRequirements} from '../../CardRequirements';
import {IActionCard} from '../../ICard';
import {SelectCard} from '../../../inputs/SelectCard';
import {DeferredAction} from '../../../deferredActions/DeferredAction';

export class WellFundedRnDDepartment extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      cost: 15,
      name: CardName.WELL_FUNDED_RND_DEPARTMENT,
      cardType: CardType.ACTIVE,

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 3).max()),
      metadata: {
        cardNumber: 'L416',
        renderData: CardRenderer.builder((b) => {
          b.action('Draw 2 cards, then discard 1 from your hand.', (eb) => {
            eb.empty().startAction.plus().cards(2).nbsp.minus().cards(1);
          });
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getTagCount(Tags.SCIENCE) <= 3;
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.drawCard(2);
    player.game.defer(new DeferredAction(
      player,
      () => {
        return new SelectCard('Select a card to discard', 'Discard', player.cardsInHand, (foundCards: Array<IProjectCard>) => {
          player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
          player.game.dealer.discard(foundCards[0]);
          player.game.log('You discarded ${0}', (b) => b.card(foundCards[0]), {reservedFor: player});
          return undefined;
        });
      },
    ));
    return undefined;
  }
}
