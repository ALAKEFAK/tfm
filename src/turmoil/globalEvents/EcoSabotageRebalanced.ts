import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Turmoil} from '../Turmoil';

export class EcoSabotageRebalanced implements IGlobalEvent {
    public name = GlobalEventName.ECO_SABOTAGE_REBALANCED;
    public description = 'Lose 5 plants (reduced by influence).';
    public revealedDelegate = PartyName.GREENS;
    public currentDelegate = PartyName.REDS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const plantPenalty = Math.max(0, 5 - turmoil.getPlayerInfluence(player));
        player.deductResource(Resources.PLANTS, plantPenalty, {log: true, from: this.name});
      });
    }
}
