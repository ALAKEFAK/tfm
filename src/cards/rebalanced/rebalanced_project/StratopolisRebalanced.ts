import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {SpaceName} from '../../SpaceName';
import {SpaceType} from '../../SpaceType';
import {Resources} from '../../Resources';
import {IActionCard, ICard, IResourceCard} from '../ICard';
import {ResourceType} from '../../ResourceType';
import {SelectCard} from '../../inputs/SelectCard';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Card} from '../Card';

export class StratopolisRebalanced extends Card implements IActionCard, IResourceCard {
  constructor() {
    super({
      name: CardName.STRATOPOLIS_REBALANCED,
      cardType: CardType.ACTIVE,
      tags: [Tags.CITY, Tags.VENUS],
      cost: 20,
      resourceType: ResourceType.FLOATER,

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 1)),
      metadata: {
        cardNumber: '248',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 2 floaters to ANY VENUS CARD.', (eb) => {
            eb.empty().startAction.floaters(2).secondaryTag(Tags.VENUS);
          }).br;
          b.production((pb) => pb.megacredits(3)).city().asterix();
          b.vpText('1 VP for every 2nd Floater on this card.');
        }),
        description: {
          text: 'Requires 1 science tag. Increase your M€ production 3 steps. Place a City tile ON THE RESERVED AREA',
          align: 'left',
        },
        victoryPoints: CardRenderDynamicVictoryPoints.floaters(1, 2),
      },
    });
  };
  public resourceCount: number = 0;

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 3);
    player.game.addCityTile(player, SpaceName.STRATOPOLIS, SpaceType.COLONY);
    return undefined;
  }
  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 2);
  }

  public getResCards(player: Player): ICard[] {
    const resourceCards = player.getResourceCards(ResourceType.FLOATER);
    return resourceCards.filter((card) => card.tags.some((cardTag) => cardTag === Tags.VENUS));
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const cards = this.getResCards(player);

    if (cards.length === 1) {
      player.addResourceTo(cards[0], {qty: 2, log: true});
      return undefined;
    }

    return new SelectCard(
      'Select card to add 2 floaters',
      'Add floater(s)',
      cards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], {qty: 2, log: true});
        return undefined;
      },
    );
  }
}
