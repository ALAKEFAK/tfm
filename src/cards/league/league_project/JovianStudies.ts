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

export class JovianStudies extends Card implements IProjectCard, IResourceCard {
  public resourceCount = 0;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.JOVIAN_STUDIES,
      tags: [Tags.JOVIAN],
      cost: 10,
      resourceType: ResourceType.SCIENCE,

      metadata: {
        cardNumber: 'L418',
        description: 'When you play a Jovian tag, including this, either add a Science resource to this card, or remove a Science resource from this card to draw a card.',
        renderData: CardRenderer.builder((b) => {
          b.jovian().played.colon().science().br;
          b.or().br;
          b.minus().science().plus().cards(1);
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    const jovianTags = card.tags.filter((tag) => tag === Tags.JOVIAN).length;
    for (let i = 0; i < jovianTags; i++) {
      player.game.defer(new DeferredAction(
        player,
        () => {
          // Can't remove a resource
          if (this.resourceCount === 0) {
            player.addResourceTo(this, 1);
            return undefined;
          }
          return new OrOptions(
            new SelectOption('Remove a science resource from this card to draw a card', 'Remove resource', () => {
              player.removeResourceFrom(this);
              player.drawCard();
              return undefined;
            }),
            new SelectOption('Add a science resource to this card', 'Add resource', () => {
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
