import {IActionCard, ICard, IResourceCard} from '../../ICard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {ResourceType} from '../../../ResourceType';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {MAX_TEMPERATURE, MAX_VENUS_SCALE, REDS_RULING_POLICY_COST} from '../../../constants';
import {CardName} from '../../../CardName';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {CardRequirements} from '../../CardRequirements';
import {CardRenderer} from '../../render/CardRenderer';
import {Card} from '../../Card';
import {SelectCard} from '../../../inputs/SelectCard';

export class RotatorImpactsRebalanced extends Card implements IActionCard, IResourceCard {
  public resourceCount: number = 0;

  constructor() {
    super({
      name: CardName.ROTATOR_IMPACTS_REBALANCED,
      cardType: CardType.ACTIVE,
      tags: [Tags.SPACE],
      cost: 6,
      resourceType: ResourceType.ASTEROID,

      requirements: CardRequirements.builder((b) => b.venus(14).max()),
      metadata: {
        cardNumber: '243',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 6 M€ to add an asteroid resource to ANY card [TITANIUM MAY BE USED].', (eb) => {
            eb.megacredits(6).titanium(1).brackets.startAction.asteroids(1).asterix();
          }).br;
          b.action('Spend 1 resource from this card to increase Venus 1 step.', (eb) => {
            eb.or().asteroids(1).startAction.venus(1);
          });
        }),
        description: 'Venus must be 14% or lower',
      },
    });
  };

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    const venusMaxed = player.game.getVenusScaleLevel() === MAX_VENUS_SCALE;
    const canSpendResource = this.resourceCount > 0 && !venusMaxed;

    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !venusMaxed) {
      return player.canAfford(6, {titanium: true}) || (canSpendResource && player.canAfford(REDS_RULING_POLICY_COST));
    }

    return player.canAfford(6, {titanium: true}) || canSpendResource;
  }

  public action(player: Player) {
    const asteroidCards = player.getResourceCards(ResourceType.ASTEROID);
    const opts: Array<SelectOption> = [];

    const addResource = new SelectOption('Pay 6 to add 1 asteroid to a card', 'Pay', () => this.addResource(player, asteroidCards));
    const spendResource = new SelectOption('Remove 1 asteroid to raise Venus 1 step', 'Remove asteroid', () => this.spendResource(player));
    const redsAreRuling = PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS);
    const temperatureIsMaxed = player.game.getTemperature() === MAX_TEMPERATURE;

    if (this.resourceCount > 0) {
      if (!redsAreRuling || temperatureIsMaxed || (redsAreRuling && player.canAfford(REDS_RULING_POLICY_COST))) {
        opts.push(spendResource);
      }
    } else {
      return this.addResource(player, asteroidCards);
    }

    if (player.canAfford(6, {titanium: true})) {
      opts.push(addResource);
    } else {
      return this.spendResource(player);
    }

    return new OrOptions(...opts);
  }

  private addResource(player: Player, asteroidCards: ICard[]) {
    player.game.defer(new SelectHowToPayDeferred(player, 6, {canUseTitanium: true, title: 'Select how to pay for Rotator Impacts action'}));

    if (asteroidCards.length === 1) {
      player.addResourceTo(this, {log: true});
      return undefined;
    }

    return new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], {log: true});
        return undefined;
      },
    );
  }

  private spendResource(player: Player) {
    player.removeResourceFrom(this);
    player.game.increaseVenusScaleLevel(player, 1);
    player.game.log('${0} removed an asteroid resource to increase Venus scale 1 step', (b) => b.player(player));
    return undefined;
  }
}
