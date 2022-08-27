import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {BuildColony} from '../../../deferredActions/BuildColony';
import {CardRenderer} from '../../render/CardRenderer';

export class FirstContact extends PreludeCard {
  constructor() {
    super({
      name: CardName.FIRST_CONTACT,
      tags: [Tags.SCIENCE],

      metadata: {
        cardNumber: 'L401',
        renderData: CardRenderer.builder((b) => {
          b.colonies(1).br;
          b.text('Place 1 colony.').br;
          b.effect('When you trade, you pay 1 less resource for it.', (eb) => {
            eb.trade().startEffect.tradeDiscount(1);
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.game.defer(new BuildColony(player, false, 'Select where to build the colony'));
    player.colonyTradeDiscount++;
    return undefined;
  }

  public onDiscard(player: Player): void {
    player.colonyTradeDiscount--;
  }
}
