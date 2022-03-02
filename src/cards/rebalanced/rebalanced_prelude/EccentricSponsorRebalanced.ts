import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {PreludeCard} from '../../prelude/PreludeCard';
import {PlayProjectCard} from '../../../deferredActions/PlayProjectCard';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class EccentricSponsorRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.ECCENTRIC_SPONSOR_REBALANCED,

      metadata: {
        cardNumber: 'P11',
        renderData: CardRenderer.builder((b) => {
          b.text('Play a card from hand, reducing its cost by 27 M€', Size.SMALL, true);
        }),
      },
    });
  }
  public getCardDiscount(player: Player) {
    if (player.lastCardPlayed !== undefined && player.lastCardPlayed.name === this.name) {
      return 27;
    }
    return 0;
  }

  public play(player: Player) {
    player.game.defer(new PlayProjectCard(player));
    return undefined;
  }
}
