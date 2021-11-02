import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Phase} from '../../../Phase';
import {GainResources} from '../../../deferredActions/GainResources';

export class AphroditeRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.APHRODITE_REBALANCED,
      tags: [Tags.PLANT, Tags.VENUS],
      startingMegaCredits: 50,
      cardType: CardType.CORPORATION,

      metadata: {
        cardNumber: 'R01',
        description: 'You start with 1 plant production, and 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(1)).nbsp.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever Venus is terraformed 1 step, you gain 3 M€ and the player (not WGT) who raised it gain 2 M€', (eb) => {
              eb.venus(1).any.startEffect;
              eb.megacredits(2).any.asterix().nbsp.megacredits(3);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    return undefined;
  }

  public static rebalancedAphroditeBonus(venusRaiser: Player, stepsRaised: number = 1): number {
    const rebalancedAphroditePlayer = venusRaiser.game.getPlayers().find((player) => player.isCorporation(CardName.APHRODITE_REBALANCED));
    if (rebalancedAphroditePlayer === undefined) return 0;

    return (rebalancedAphroditePlayer.id === venusRaiser.id) ? 5 * stepsRaised : 2 * stepsRaised;
  }

  public static onVenusIncrease(venusRaiser: Player, venusStep: number = 1) {
    // Rebalanced Aphrodite owner get 3M€ per step
    const aphroditePlayer = venusRaiser.game.getCardPlayer(CardName.APHRODITE_REBALANCED);
    aphroditePlayer.game.defer(
      new GainResources(aphroditePlayer, Resources.MEGACREDITS, {
        count: 3 * venusStep,
        cb: () => aphroditePlayer.game.log(
          '${0} gained ${1} ${2} from ${3}\'s ability.',
          (b) => b.player(aphroditePlayer).number(3 * venusStep).string(Resources.MEGACREDITS).cardName(CardName.APHRODITE_REBALANCED),
        ),
      }), -1,
    );
    // Player who raise Venus get 2M€ per step
    if (venusRaiser.game.phase === Phase.ACTION || venusRaiser.game.phase === Phase.PRELUDES) {
      venusRaiser.game.defer(
        new GainResources(venusRaiser, Resources.MEGACREDITS, {
          count: 2 * venusStep,
          cb: () => venusRaiser.game.log(
            '${0} gained ${1} ${2} from ${3}\'s ability.',
            (b) => b.player(venusRaiser).number(2 * venusStep).string(Resources.MEGACREDITS).cardName(CardName.APHRODITE_REBALANCED),
          ),
        }), -1,
      );
    }
  }
}
