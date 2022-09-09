import {IProjectCard} from '../../IProjectCard';
import {IResourceCard} from '../../ICard';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {ResourceType} from '../../../ResourceType';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {CardRenderer} from '../../render/CardRenderer';
import {DeferredAction} from '../../../deferredActions/DeferredAction';

export class MediaAndTechnologyStudies extends Card implements IProjectCard, IResourceCard {
  public resourceCount = 0;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MEDIA_AND_TECHNOLOGY_STUDIES,
      tags: [Tags.EARTH],
      cost: 10,
      resourceType: ResourceType.DATA,

      metadata: {
        cardNumber: 'L418',
        description: 'When you play an event, either add a Data resource to this card, or remove a Data resource from this card to draw a card.',
        renderData: CardRenderer.builder((b) => {
          b.event().played.colon().data().br;
          b.or().br;
          b.minus().data().plus().cards(1);
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (card.cardType === CardType.EVENT) {
      player.game.defer(new DeferredAction(
        player,
        () => {
          // Can't remove a resource
          if (this.resourceCount === 0) {
            player.addResourceTo(this, 1);
            return undefined;
          }
          return new OrOptions(
            new SelectOption('Remove a Data resource from this card to draw a card', 'Remove resource', () => {
              player.removeResourceFrom(this);
              player.drawCard();
              return undefined;
            }),
            new SelectOption('Add a Data resource to this card', 'Add resource', () => {
              player.addResourceTo(this, 1);
              return undefined;
            }),
          );
        },
      ), -1); // Unshift that deferred action
    }
    return undefined;
  }
}
