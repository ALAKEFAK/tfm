import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {SelectAmount} from '../../../inputs/SelectAmount';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class MarsHeavyIndustry extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.MARS_HEAVY_INDUSTRY,
      cost: 8,
      tags: [Tags.BUILDING],

      metadata: {
        cardNumber: 'L302',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.text('x').energy(1);
          }).br;
          b.or().br;
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.text('2x').heat(1);
          }).br;
        }),
        description: 'Spend X (up to 5) steel to get X energy OR 2X heat.',
        victoryPoints: 1,
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.steel > 0;
  }

  private getEnergyOption(player: Player, availableSteel: number): SelectAmount {
    return new SelectAmount(
      'Select amount of steel to spend',
      'Gain energy',
      (amount: number) => {
        player.addResource(Resources.ENERGY, amount);
        player.deductResource(Resources.STEEL, (amount));

        player.game.log('${0} gained ${1} energy', (b) => b.player(player).number(amount));
        return undefined;
      },
      1,
      availableSteel,
    );
  }

  private getHeatOption(player: Player, availableSteel: number): SelectAmount {
    return new SelectAmount(
      'Select amount of steel to spend',
      'Gain heat',
      (amount: number) => {
        player.addResource(Resources.HEAT, (amount * 2));
        player.deductResource(Resources.STEEL, (amount));

        player.game.log('${0} gained ${1} heat', (b) => b.player(player).number(2 * amount));
        return undefined;
      },
      1,
      availableSteel,
    );
  }

  public action(player: Player) {
    const availableSteel = Math.min(5, player.steel);
    if (availableSteel >= 1) {
      return new OrOptions(
        new SelectOption('Spend X (up to 5) steel to gain X energy', 'Get energy', () => {
          return this.getEnergyOption(player, availableSteel);
        }),
        new SelectOption('Spend X (up to 5) steel to gain 2X heat', 'Get heat', () => {
          return this.getHeatOption(player, availableSteel);
        }),
      );
    }
    return undefined;
  }
}
