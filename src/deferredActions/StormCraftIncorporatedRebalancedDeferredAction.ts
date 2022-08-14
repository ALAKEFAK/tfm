import {Player} from '../Player';
import {AndOptions} from '../inputs/AndOptions';
import {SelectAmount} from '../inputs/SelectAmount';
import {DeferredAction, Priority} from './DeferredAction';

export class StormCraftIncorporatedRebalancedDeferredAction implements DeferredAction {
  public priority = Priority.DEFAULT;
  constructor(
        public player: Player,
        public count: number = 1,
        public title: string = 'Storm Craft Incorporated Effect - Gain ' + count + ' mc / energy resource(s)',
  ) {}

  public execute() {
    let megacreditsAmount: number = 0;
    let energyAmount: number = 0;

    const selectMegacredit = new SelectAmount('Megacredits', 'Select', (amount: number) => {
      megacreditsAmount = amount;
      return undefined;
    }, 0, this.count);
    const selectEnergy = new SelectAmount('Energy', 'Select', (amount: number) => {
      energyAmount = amount;
      return undefined;
    }, 0, this.count);

    const selectResources = new AndOptions(
      () => {
        if (
          megacreditsAmount + energyAmount > this.count
        ) {
          throw new Error('Need to select ' + this.count + ' resource(s)');
        }
        this.player.megaCredits += megacreditsAmount;
        this.player.energy += energyAmount;
        this.player.game.log('${0} gained ${1} M€ and ${2} energy resource(s)', (b) => b.player(this.player).number(megacreditsAmount).number(energyAmount));
        return undefined;
      },
      selectMegacredit,
      selectEnergy,
    );
    selectResources.title = this.title;

    return selectResources;
  }
}
