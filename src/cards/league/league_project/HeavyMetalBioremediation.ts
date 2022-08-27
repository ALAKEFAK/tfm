import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {SelectAmount} from '../../../inputs/SelectAmount';
import {Resources} from '../../../Resources';
import {CardRequirements} from '../../CardRequirements';

export class HeavyMetalBioremediation extends Card implements IProjectCard {
  // author: MartyM
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.HEAVY_METAL_BIOREMEDIATION,
      cost: 10,
      tags: [Tags.MICROBE, Tags.BUILDING],

      requirements: CardRequirements.builder((b) => b.oxygen(7)),
      metadata: {
        cardNumber: 'L309',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.megacredits(0);
          }).br;
          b.or().br;
          b.action(undefined, (eb) => {
            eb.text('x').titanium(1).startAction.megacredits(0);
          }).br;
        }),
        description: 'Convert up to 3 of a metal for it\'s monetary value (including bonuses).',
        victoryPoints: 1,
      },
    });
  }

  public play() {
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }

  public canAct(player: Player): boolean {
    return player.steel > 0 || player.titanium > 0;
  }

  public action(player: Player) {
    const availableSteel = Math.min(3, player.steel);
    const availableTitanium = Math.min(3, player.titanium);

    const orOptions = new OrOptions();

    if (availableSteel >= 1) {
      orOptions.options.push(new SelectOption('Convert up to 3 steel for it\'s monetary value (including bonuses).',
        'Convert steel', () => {
          return this.convSteelOption(player, availableSteel);
        }));
    }

    if (availableTitanium >= 1) {
      orOptions.options.push(new SelectOption('Convert up to 3 titanium for it\'s monetary value (including bonuses).',
        'Convert titanium', () => {
          return this.convTitaniumOption(player, availableTitanium);
        }));
    }

    if (orOptions.options.length === 1) return orOptions.options[0].cb();
    return orOptions;
  }

  private convSteelOption(player: Player, availableSteel: number): SelectAmount {
    return new SelectAmount(
      'Select amount of steel to spend',
      'Gain MC',
      (amount: number) => {
        player.addResource(Resources.MEGACREDITS, player.getSteelValue() * amount);
        player.deductResource(Resources.STEEL, (amount));

        player.game.log('${0} gained ${1} MC', (b) => b.player(player).number(player.getSteelValue() * amount));
        return undefined;
      },
      1,
      availableSteel,
    );
  }

  private convTitaniumOption(player: Player, availableTitanium: number): SelectAmount {
    return new SelectAmount(
      'Select amount of titanium to spend',
      'Gain MC',
      (amount: number) => {
        player.addResource(Resources.MEGACREDITS, player.getTitaniumValue() * amount);
        player.deductResource(Resources.TITANIUM, (amount));

        player.game.log('${0} gained ${1} MC', (b) => b.player(player).number(player.getTitaniumValue() * amount));
        return undefined;
      },
      1,
      availableTitanium,
    );
  }
}
