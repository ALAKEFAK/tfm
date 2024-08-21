import {IActionCard} from '../ICard';
import {PreludeCard} from '../prelude/PreludeCard';
import {IPlayer} from '../../Player';
import {getBehaviorExecutor} from '../../behavior/BehaviorExecutor';
import {PlayerInput} from '../../PlayerInput';

/**
 * A prelude card with an action property. Duplicates code from ActionCard.
 */
export abstract class ActivePreludeCard extends PreludeCard implements IActionCard {
  public canAct(player: Player) {
    if (this.properties.action === undefined) {
      throw new Error('action not defined');
    }
    if (!getBehaviorExecutor().canExecute(this.properties.action, player, this)) {
      return false;
    }
    return this.bespokeCanAct(player);
  }

  public action(player: Player): PlayerInput | undefined {
    if (this.properties.action === undefined) {
      throw new Error('action not defined');
    }
    getBehaviorExecutor().execute(this.properties.action, player, this);
    return this.bespokeAction(player);
  }

  public bespokeCanAct(_player: Player): boolean {
    return true;
  }

  public bespokeAction(_player: Player): PlayerInput | undefined {
    return undefined;
  }
}
