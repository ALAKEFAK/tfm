import {IProjectCard} from '../../IProjectCard';
import {IActionCard, IResourceCard} from '../../ICard';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {ResourceType} from '../../../ResourceType';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';

export class SpaceDebrisCollection extends Card implements IActionCard, IProjectCard, IResourceCard {
  public resourceCount = 0;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.SPACE_DEBRIS_COLLECTION,
      tags: [Tags.SPACE],
      cost: 10,
      resourceType: ResourceType.ASTEROID,

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 3).max()),
      metadata: {
        cardNumber: 'L417',
        description: 'Add 3 asteroids to this card.',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 asteroid to this card.', (eb) => {
            eb.empty().startAction.asteroids(1).nbsp.or();
          }).br;
          b.action('Spend 1 asteroid here to draw a card.', (eb) => {
            eb.asteroids(1).startAction.cards(1);
          }).br;
          b.asteroids(3);
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getTagCount(Tags.SCIENCE, false, false) <= 3;
  }

  public play() {
    this.resourceCount = 3;
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const hasAsteroids = this.resourceCount > 0;

    const drawCardOption = new SelectOption('Remove 1 asteroid on this card to draw a card', 'Remove asteroid', () => {
      this.resourceCount--;
      player.drawCard(1);
      return undefined;
    });

    const addAsteroidToSelf = new SelectOption('Add 1 asteroid to this card', 'Add asteroid', () => {
      player.addResourceTo(this, {log: true});
      return undefined;
    });

    if (hasAsteroids) {
      return new OrOptions(drawCardOption, addAsteroidToSelf);
    } else {
      player.addResourceTo(this, {log: true});
      return undefined;
    }
  }
}
