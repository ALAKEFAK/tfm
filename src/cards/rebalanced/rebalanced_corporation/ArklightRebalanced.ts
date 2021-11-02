import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {ResourceType} from '../../../ResourceType';
import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {IResourceCard} from '../../ICard';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../../render/CardRenderDynamicVictoryPoints';
import {Resources} from '../../../Resources';

export class ArklightRebalanced extends Card implements CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.ARKLIGHT_REBALANCED,
      tags: [Tags.ANIMAL],
      startingMegaCredits: 50,
      resourceType: ResourceType.ANIMAL,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: 'R04',
        description: 'You start with 50 M€. 1 VP per 2 animals on this card.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an animal or plant tag, including this, gain 1 M€ production and add 1 animal to this card.', (eb) => {
              eb.animals(1).played.slash().plants(1).played.startEffect.production((pb) => pb.megacredits(1)).animals(1);
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 2),
      },
    });
  }

    public resourceCount = 0;

    public play(player: Player) {
      player.addProduction(Resources.MEGACREDITS, 1);
      player.addResourceTo(this);
      return undefined;
    }

    public onCardPlayed(player: Player, card: IProjectCard): void {
      if (player.isCorporation(CardName.ARKLIGHT_REBALANCED)) {
        const plantAnimalTagCount = card.tags.filter((cardTag) => cardTag === Tags.ANIMAL || cardTag === Tags.PLANT).length;
        player.addResourceTo(this, plantAnimalTagCount);
        player.addProduction(Resources.MEGACREDITS, plantAnimalTagCount);
      }
    }

    public getVictoryPoints(): number {
      return Math.floor(this.resourceCount / 2);
    }
}
