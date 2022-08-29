import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {Turmoil} from '../../Turmoil';
import {Tags} from '../../../cards/Tags';

export class HeatedDiscussions implements IGlobalEvent {
    public name = GlobalEventName.HEATED_DISCUSSIONS;
    public description = 'Lose 2 M€ for each science tag (max 5, then reduced by influence). Gain 1 heat per heat production (max 5).';
    public revealedDelegate = PartyName.SCIENTISTS;
    public currentDelegate = PartyName.KELVINISTS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = Math.min(5, player.getTagCount(Tags.SCIENCE, false, false)) - turmoil.getPlayerInfluence(player);
        if (amount > 0) {
          player.addResource(Resources.MEGACREDITS, -2 * amount, {log: true, from: this.name});
        }
        player.addResource(Resources.HEAT, Math.min(5, player.getProduction(Resources.HEAT)), {log: true, from: this.name});
      });
    }
}
