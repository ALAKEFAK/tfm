import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {ResourceType} from '../../../ResourceType';
import {Player} from '../../../Player';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {IActionCard, IResourceCard} from '../../ICard';

export class DNAExtractionFromSoil extends Card implements IActionCard, IProjectCard, IResourceCard {
  public resourceCount: number = 0;

  constructor() {
    super({
      cost: 6,
      tags: [Tags.MICROBE],
      name: CardName.DNA_EXTRACTION_FROM_SOIL,
      cardType: CardType.ACTIVE,
      resourceType: ResourceType.MICROBE,

      metadata: {
        cardNumber: 'L415',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 microbe to this card, or remove 1 microbe here to draw a card.', (eb) => {
            eb.empty().arrow().microbes(1).or();
            eb.microbes(1).startAction.cards(1);
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    if (this.resourceCount < 1) {
      player.addResourceTo(this, 1);
      return undefined;
    }

    const opts: Array<SelectOption> = [];

    const addResource = new SelectOption('Add 1 microbe on this card', 'Add microbe', () => this.addResource(player));
    const spendResource = new SelectOption('Remove 1 microbe on this card to draw a card', 'Remove microbe', () => this.spendResource(player));

    opts.push(spendResource);
    opts.push(addResource);

    return new OrOptions(...opts);
  }

  private addResource(player: Player) {
    player.addResourceTo(this, 1);
    return undefined;
  }

  private spendResource(player: Player) {
    this.resourceCount--;
    player.drawCard();
    return undefined;
  }
}
