import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Turmoil} from '../Turmoil';
import {CorrosiveRainDeferredActionRebalanced} from '../../deferredActions/CorrosiveRainDeferredActionRebalanced';

export class CorrosiveRainRebalanced implements IGlobalEvent {
    public name = GlobalEventName.CORROSIVE_RAIN_REBALANCED;
    public description = 'Lose 2 floaters from a card or 7 M€. Draw 1 card for each influence.';
    public revealedDelegate = PartyName.KELVINISTS;
    public currentDelegate = PartyName.GREENS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        player.drawCard(turmoil.getPlayerInfluence(player));
        game.defer(new CorrosiveRainDeferredActionRebalanced(player));
      });
    }
}
