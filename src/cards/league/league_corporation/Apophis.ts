import {Card} from '../../Card';
import {Player} from '../../../Player';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {CorporationCard} from '../../corporation/CorporationCard';
import {OrOptions} from '../../../inputs/OrOptions';
import {Tags} from '../../Tags';
import {ResourceType} from '../../../ResourceType';
import {IResourceCard} from '../../ICard';
import {SelectApophisCorpEffect} from '../../../deferredActions/SelectApophisCorpEffect';
import {AltSecondaryTag} from '../../render/CardRenderItem';
import {Size} from '../../render/Size';

export class Apophis extends Card implements CorporationCard, IResourceCard {
  public resourceCount = 0;

  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.APOPHIS,
      startingMegaCredits: 40,
      tags: [Tags.SPACE],
      resourceType: ResourceType.ASTEROID,
      initialActionText: 'Draw a Space Event',

      metadata: {
        cardNumber: 'L420',
        description: 'You start with 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(40).nbsp.cards(1).secondaryTag(AltSecondaryTag.SPACE_EVENT).br;
          b.titanium(3).asteroids(2);
          b.corpBox('effect', (ce) => {
            ce.text('When any player plays a space event, you gain 2 M€. When you play a space event, add 1 asteroid resource to this card OR remove 1 asteroid resource from this card and raise either temperature or Venus 1 step.', Size.TINY, true);
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(1, {
      include: (card) => card.cardType === CardType.EVENT && card.tags.includes(Tags.SPACE),
    });
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    this.effect(player, card);
  }

  public play(player: Player) {
    player.titanium += 3;
    this.resourceCount = 2;
    return undefined;
  }

  private effect(activePlayer: Player, card: IProjectCard | CorporationCard): OrOptions | undefined {
    const gainPerSpaceEvent = 2;
    const apophisPlayer = activePlayer.game.getCardPlayer(this.name);

    if (card.cardType === CardType.EVENT && card.tags.includes(Tags.SPACE)) {
      apophisPlayer.megaCredits += gainPerSpaceEvent;

      if (activePlayer.id === apophisPlayer.id) {
        apophisPlayer.game.defer(new SelectApophisCorpEffect(apophisPlayer));
      }
    }
    return undefined;
  }
}
