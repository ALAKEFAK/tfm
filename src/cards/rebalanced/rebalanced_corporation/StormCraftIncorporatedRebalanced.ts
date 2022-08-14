import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {ResourceType} from '../../../ResourceType';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {AltSecondaryTag} from '../../render/CardRenderItem';

export class StormCraftIncorporatedRebalanced extends Card implements CorporationCard {
  private static readonly floaterCards: Set<CardName> = new Set([
    CardName.AEROSPORT_TOURNAMENT,
    CardName.AIR_SCRAPPING_EXPEDITION,
    CardName.AIR_RAID,
    CardName.AIRLINERS,
    CardName.ATMOSCOOP,
    CardName.FLOATER_LEASING,
    CardName.FLOATER_PROTOTYPES,
    CardName.FLOATER_TECHNOLOGY,
    CardName.HYDROGEN_TO_VENUS,
    CardName.NITROGEN_FROM_TITAN,
    CardName.STRATOSPHERIC_BIRDS,
  ]);

  constructor() {
    super({
      name: CardName.STORMCRAFT_INCORPORATED_REBALANCED,
      tags: [Tags.JOVIAN],
      startingMegaCredits: 50,
      cardType: CardType.CORPORATION,
      initialActionText: 'Draw 1 card with a floater icon on it',
      metadata: {
        cardNumber: 'R29',
        description: 'You start with 50 M€. As your first action, reveal cards from the deck until you have revealed 1 card with a floater icon on it. Take that card into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(50).nbsp.cards(1).secondaryTag(AltSecondaryTag.FLOATER);
          b.corpBox('effect', (ce) => {
            ce.effect('When you gain a floater to ANY CARD, also gain 1MC or 1 Energy.', (eb) => {
              eb.floaters(1).asterix().startEffect.megacredits(1).slash().energy(1);
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(1, {
      include: (card) => StormCraftIncorporatedRebalanced.floaterCards.has(card.name) || card.resourceType === ResourceType.FLOATER,
    });
    return undefined;
  }

  public play() {
    return undefined;
  }
}
