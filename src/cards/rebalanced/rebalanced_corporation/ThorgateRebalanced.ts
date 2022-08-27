import {Card} from '../../Card';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {IProjectCard} from '../../IProjectCard';
import {CorporationCard} from '../../corporation/CorporationCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {SelectAmount} from '../../../inputs/SelectAmount';
import {SelectHowToPayDeferred} from '../../../deferredActions/SelectHowToPayDeferred';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class ThorgateRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.THORGATE_REBALANCED,
      tags: [Tags.SCIENCE, Tags.ENERGY],
      startingMegaCredits: 45,

      cardDiscount: {tag: Tags.ENERGY, amount: 3},
      metadata: {
        cardNumber: 'R13',
        description: 'You start with 1 energy production and 45 M€.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1)).nbsp.megacredits(45);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Spend 2X M€ to gain X energy.', (eb) => {
              eb.megacredits(2).multiplier.startAction.text('x').energy(1);
            }).or();
            ce.action('Decr. energy prod. gain 8 M€.', (eb) => {
              eb.production((pb) => pb.energy(1)).startAction.megacredits(8);
            });
            ce.effect(undefined, (eb) => {
              // TODO(chosta): energy().played needs to be power() [same for space()]
              eb.energy(1).played.asterix().slash().production((pb) => {
                pb.energy(1).heat(1);
              }).asterix().startEffect.megacredits(-3);
            });
          });
        }),
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    if (card.tags.includes(Tags.ENERGY)) {
      return 3;
    }
    return 0;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.canAfford(2) || player.getProduction(Resources.ENERGY) >= 1;
  }

  public action(player: Player) {
    const availableMC = player.spendableMegacredits();
    if (availableMC >= 2 && player.getProduction(Resources.ENERGY) >= 1) {
      return new OrOptions(
        new SelectOption('Spend 2X M€ to gain X energy', 'Spend M€', () => {
          return this.getEnergyOption(player, availableMC);
        }),
        new SelectOption('Decrease energy production 1 step to gain 8 M€', 'Decrease energy', () => {
          return this.getMegacreditsOption(player);
        }),
      );
    } else if (availableMC >= 2) {
      return this.getEnergyOption(player, availableMC);
    } else if (player.getProduction(Resources.ENERGY) >= 1) {
      return this.getMegacreditsOption(player);
    }
    return undefined;
  }

  private getEnergyOption(player: Player, availableMC: number): SelectAmount {
    return new SelectAmount(
      'Select amount of energy to gain',
      'Gain energy',
      (amount: number) => {
        if (player.canUseHeatAsMegaCredits) {
          player.addResource(Resources.ENERGY, amount);
          player.game.defer(new SelectHowToPayDeferred(player, (amount * 2)));
        } else {
          player.addResource(Resources.ENERGY, amount);
          player.deductResource(Resources.MEGACREDITS, (amount * 2));
        }

        player.game.log('${0} gained ${1} energy', (b) => b.player(player).number(amount));
        return undefined;
      },
      1,
      Math.floor(availableMC / 2),
    );
  }

  private getMegacreditsOption(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.addResource(Resources.MEGACREDITS, 8);
    player.game.log('${0} decreased energy production 1 step to gain 8 M€', (b) => b.player(player));
    return undefined;
  }
}

