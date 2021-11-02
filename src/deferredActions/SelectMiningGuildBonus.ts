import {Player} from '../Player';
import {DeferredAction, Priority} from './DeferredAction';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {Resources} from '../Resources';

export class SelectMiningGuildBonus implements DeferredAction {
  public priority = Priority.SELECT_MINING_GUILD_BONUS;
  constructor(
        public player: Player,
        public title: string = 'Select Mining Guild bonus',
  ) {}

  public execute() {
    const option = new OrOptions(
      new SelectOption('Gain titanium production', 'Select', () => {
        this.player.addProduction(Resources.TITANIUM, 1);
        return undefined;
      }),
      new SelectOption('Gain steel production', 'Select', () => {
        this.player.addProduction(Resources.STEEL, 1);
        return undefined;
      }),
    );
    option.title = this.title;
    return option;
  }
}
