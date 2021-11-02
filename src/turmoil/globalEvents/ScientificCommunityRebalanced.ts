import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Turmoil} from '../Turmoil';

export class ScientificCommunityRebalanced implements IGlobalEvent {
    public name = GlobalEventName.SCIENTIFIC_COMMUNITY_REBALANCED;
    public description = 'Gain 1 M€ for each card in hand (max 15) and influence.';
    public revealedDelegate = PartyName.REDS;
    public currentDelegate = PartyName.SCIENTISTS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const amount = Math.min(player.cardsInHand.length, 15) + turmoil.getPlayerInfluence(player);
        player.addResource(Resources.MEGACREDITS, amount, {log: true, from: this.name});
      });
    }
}
