import {IGlobalEvent} from '../IGlobalEvent';
import {GlobalEventName} from '../GlobalEventName';
import {PartyName} from '../../parties/PartyName';
import {Game} from '../../../Game';
import {Turmoil} from '../../Turmoil';
import {ResourceType} from '../../../ResourceType';
import {AddResourcesToCard} from '../../../deferredActions/AddResourcesToCard';

export class SealockedHolmes implements IGlobalEvent {
    public name = GlobalEventName.SEALOCKED_HOLMES;
    public description = 'Remove 1 microbe from each card that can collect microbes. Add 1 animal to a card per influence';
    public revealedDelegate = PartyName.REDS;
    public currentDelegate = PartyName.GREENS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const resourceCards = player.getResourceCards(ResourceType.MICROBE);
        resourceCards.forEach((card) => {
          player.removeResourceFrom(card);
        });
        const amount = turmoil.getPlayerInfluence(player);
        if (amount > 0) {
          game.defer(new AddResourcesToCard(player, ResourceType.ANIMAL, {count: amount}));
        }
      });
    }
}
