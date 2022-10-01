import {IProjectCard} from '../../IProjectCard';
import {IResourceCard} from '../../ICard';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {CardRenderer} from '../../render/CardRenderer';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {SelectCard} from '../../../inputs/SelectCard';

export class OuterRimUniversity extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.OUTER_RIM_UNIVERSITY,
      tags: [Tags.JOVIAN, Tags.SPACE],
      cost: 10,

      metadata: {
        cardNumber: 'L418',
        victoryPoints: 1,
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Jovian tag, including this, you may discard a card from hand to draw a card.', (eb) => {
            eb.jovian().played.startEffect.minus().cards(1).nbsp.plus().cards(1);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public getVictoryPoints(): number {
    return 1;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    const jovianTags = card.tags.filter((tag) => tag === Tags.JOVIAN).length;
    for (let i = 0; i < jovianTags; i++) {
      player.game.defer(new DeferredAction(
        player,
        () => {
          // No card to discard
          if (player.cardsInHand.length === 0) {
            return undefined;
          }
          const selectCardtoDiscard = new SelectCard('Select a card to discard', 'Discard', player.cardsInHand, (foundCards: Array<IProjectCard>) => {
            player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
            player.game.dealer.discard(foundCards[0]);
            player.game.log('${0} is using their ${1} effect to draw a card.', (b) => b.player(player).card(this));
            player.game.log('You discarded ${0}', (b) => b.card(foundCards[0]), {reservedFor: player});
            return undefined;
          });
          selectCardtoDiscard.buttonDanger = true;

          return new OrOptions(
            selectCardtoDiscard,
            new SelectOption('Do nothing', 'Confirm', () => {
              return undefined;
            }),
          );
        },
      ));
    }
    return undefined;
  }
}
