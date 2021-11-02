import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {ResourceType} from '../../../ResourceType';
import {ICard, IActionCard, IResourceCard} from '../../ICard';
import {AndOptions} from '../../../inputs/AndOptions';
import {SelectAmount} from '../../../inputs/SelectAmount';
import {SelectCard} from '../../../inputs/SelectCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {PlayerInput} from '../../../PlayerInput';
import {Resources} from '../../../Resources';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class StormCraftIncorporatedRebalanced extends Card implements IActionCard, CorporationCard, IResourceCard {
  constructor() {
    super({
      name: CardName.STORMCRAFT_INCORPORATED_REBALANCED,
      tags: [Tags.JOVIAN],
      startingMegaCredits: 50,
      resourceType: ResourceType.FLOATER,
      cardType: CardType.CORPORATION,
      metadata: {
        cardNumber: 'R29',
        description: 'You start with 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(50);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Add two floaters to one OTHER card or one floater to THIS card.', (eb) => {
              eb.empty().startAction.floaters(2).asterix().nbsp.or().nbsp.floaters(1).asterix();
            });
            ce.effect('Floaters on this card may be used as 3 heat each.', (eb) => {
              eb.startEffect.floaters(1).equals().heat(3);
            });
          });
        }),
      },
    });
  }

  public resourceCount = 0;

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const otherfloaterCards = player.getResourceCards(ResourceType.FLOATER).filter((card) => card.name !== this.name);

    if (otherfloaterCards.length === 0) {
      player.addResourceTo(this, {qty: 1, log: true});
      return undefined;
    }

    const addFloaterToOtherCards = new SelectCard(
      'Add 2 floaters to one OTHER card',
      'Add floaters',
      otherfloaterCards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], {qty: 2, log: true});
        return undefined;
      },
    );

    const addFloaterToSelf = new SelectOption(
      'Add one floater to Stormcraft',
      'Add floater',
      () => {
        player.addResourceTo(this, {qty: 1, log: true});
        return undefined;
      },
    );
    return new OrOptions(addFloaterToOtherCards, addFloaterToSelf);
  }

  public spendHeat(player: Player, targetAmount: number,
    cb: () => (undefined | PlayerInput) = () => undefined): AndOptions {
    let heatAmount: number;
    let floaterAmount: number;
    const heatPerFloater = 3;

    return new AndOptions(
      () => {
        if (heatAmount + (floaterAmount * heatPerFloater) < targetAmount) {
          throw new Error(`Need to pay ${targetAmount} heat`);
        }
        if (heatAmount > 0 && heatAmount - 1 + (floaterAmount * heatPerFloater) >= targetAmount) {
          throw new Error(`You cannot overspend heat`);
        }
        if (floaterAmount > 0 && heatAmount + ((floaterAmount - 1) * heatPerFloater) >= targetAmount) {
          throw new Error(`You cannot overspend floaters`);
        }
        player.removeResourceFrom(player.corporationCard as ICard, floaterAmount);
        player.deductResource(Resources.HEAT, heatAmount);
        return cb();
      },
      new SelectAmount('Select amount of heat to spend', 'Spend heat', (amount: number) => {
        heatAmount = amount;
        return undefined;
      }, 0, Math.min(player.heat, targetAmount)),
      new SelectAmount('Select amount of floaters on corporation to spend', 'Spend floaters', (amount: number) => {
        floaterAmount = amount;
        return undefined;
      }, 0, Math.min(player.getResourcesOnCorporation(), Math.ceil(targetAmount / heatPerFloater))),
    );
  }
}
