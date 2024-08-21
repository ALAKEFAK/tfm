import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Resources} from '../../../Resources';
import {Turmoil} from '../../Turmoil';
import {Tags} from '../../../cards/Tags';

export class HeatedDiscussions implements IGlobalEvent {
    public name = GlobalEventName.HEATED_DISCUSSIONS;
    public description = 'Lose 1 M€ for each science tag. Gain 1 heat per heat production (max 5) and 2 heat per influence.';
    public revealedDelegate = PartyName.SCIENTISTS;
    public currentDelegate = PartyName.KELVINISTS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        player.addResource(Resources.MEGACREDITS, -player.getTagCount(Tags.SCIENCE, false, false), {log: true, from: this.name});
        player.addResource(Resources.HEAT, Math.min(5, player.getProduction(Resources.HEAT)) + 2 * turmoil.getPlayerInfluence(player), {log: true, from: this.name});
      });
    }
}
