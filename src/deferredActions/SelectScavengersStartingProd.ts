import {Player} from '../Player';
import {DeferredAction, Priority} from './DeferredAction';
import {SelectAmount} from '../inputs/SelectAmount';
import {AndOptions} from '../inputs/AndOptions';
import {Resources} from '../Resources';

export class SelectScavengersStartingProd implements DeferredAction {
  public priority = Priority.DEFAULT;

  constructor(
    public player: Player,
    public title: string = 'Select Scavengers Starting Production',
  ) {
  }

  public execute() {
    let megacreditsAmount: number = 0;
    let steelAmount: number = 0;
    let titaniumAmount: number = 0;
    let plantsAmount: number = 0;
    let energyAmount: number = 0;
    let heatAmount: number = 0;

    const selectMegacredit = new SelectAmount('Megacredits', 'Select', (amount: number) => {
      megacreditsAmount = amount;
      return undefined;
    }, 0, 1);
    const selectSteel = new SelectAmount('Steel', 'Select', (amount: number) => {
      steelAmount = amount;
      return undefined;
    }, 0, 1);
    const selectTitanium = new SelectAmount('Titanium', 'Select', (amount: number) => {
      titaniumAmount = amount;
      return undefined;
    }, 0, 1);
    const selectPlants = new SelectAmount('Plants', 'Select', (amount: number) => {
      plantsAmount = amount;
      return undefined;
    }, 0, 1);
    const selectEnergy = new SelectAmount('Energy', 'Select', (amount: number) => {
      energyAmount = amount;
      return undefined;
    }, 0, 1);
    const selectHeat = new SelectAmount('Heat', 'Select', (amount: number) => {
      heatAmount = amount;
      return undefined;
    }, 0, 1);

    const selectResources = new AndOptions(
      () => {
        if (
          megacreditsAmount +
          steelAmount +
          titaniumAmount +
          plantsAmount +
          energyAmount +
          heatAmount !== 2
        ) {
          throw new Error('Need to select ' + 2 + ' resources');
        }
        if (megacreditsAmount > 0) this.player.addProduction(Resources.MEGACREDITS, megacreditsAmount, {log: true});
        if (steelAmount > 0) this.player.addProduction(Resources.STEEL, steelAmount, {log: true});
        if (titaniumAmount > 0) this.player.addProduction(Resources.TITANIUM, titaniumAmount, {log: true});
        if (plantsAmount > 0) this.player.addProduction(Resources.PLANTS, plantsAmount, {log: true});
        if (energyAmount > 0) this.player.addProduction(Resources.ENERGY, energyAmount, {log: true});
        if (heatAmount > 0) this.player.addProduction(Resources.HEAT, heatAmount, {log: true});
        return undefined;
      },
      selectMegacredit,
      selectSteel,
      selectTitanium,
      selectPlants,
      selectEnergy,
      selectHeat,
    );
    selectResources.title = this.title;

    return selectResources;
  }
}
