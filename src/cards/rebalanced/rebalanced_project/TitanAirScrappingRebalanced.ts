import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {ResourceType} from '../../../ResourceType';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {IResourceCard} from '../../ICard';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../../constants';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';

export class TitanAirScrappingRebalanced extends Card implements IProjectCard, IResourceCard {
  public resourceCount: number = 0;
  // How many floaters should you receive for 1 ti?
  private floatersToGet: number = 4;

  constructor() {
    super({
      cost: 21,
      tags: [Tags.JOVIAN],
      name: CardName.TITAN_AIRSCRAPPING_REBALANCED,
      cardType: CardType.ACTIVE,
      resourceType: ResourceType.FLOATER,

      metadata: {
        cardNumber: 'C43',
        renderData: CardRenderer.builder((b) => {
          b.action(`Spend 1 titanium to add ${this.floatersToGet} floaters here.`, (eb) => {
            eb.titanium(1).startAction.floaters(this.floatersToGet);
          }).br;
          b.or().br;
          b.action('Spend 2 floaters here to increase your TR 1 step.', (eb) => {
            eb.floaters(2).startAction.tr(1);
          });
        }),
        victoryPoints: 2,
      },
    });
  }

  public canAct(player: Player): boolean {
    const hasTitanium = player.titanium > 0;
    const hasResources = this.resourceCount >= 2;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS)) {
      return hasTitanium || (player.canAfford(REDS_RULING_POLICY_COST) && hasResources);
    }

    return hasTitanium || hasResources;
  }

  public action(player: Player) {
    const opts: Array<SelectOption> = [];

    const addResource = new SelectOption(`Spend 1 titanium to add ${this.floatersToGet} floaters on this card`, 'Spend titanium', () => this.addResource(player));
    const spendResource = new SelectOption('Remove 2 floaters on this card to increase your TR 1 step', 'Remove floaters', () => this.spendResource(player));

    if (this.resourceCount >= 2 && player.titanium > 0) {
      const redsAreRuling = PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS);
      if (!redsAreRuling || (redsAreRuling && player.canAfford(REDS_RULING_POLICY_COST))) {
        opts.push(spendResource);
      }
      opts.push(addResource);
    } else if (player.titanium > 0) {
      return this.addResource(player);
    } else {
      return this.spendResource(player);
    }

    return new OrOptions(...opts);
  }

  public play() {
    return undefined;
  }

  public getVictoryPoints(): number {
    return 2;
  }

  private addResource(player: Player) {
    player.addResourceTo(this, this.floatersToGet);
    player.titanium--;
    return undefined;
  }

  private spendResource(player: Player) {
    player.removeResourceFrom(this, 2);
    player.increaseTerraformRating();
    return undefined;
  }
}
