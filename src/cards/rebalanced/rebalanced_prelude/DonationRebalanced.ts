import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class DonationRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.DONATION_REBALANCED,

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(23);
        }),
        description: 'Gain 23 M€.',
      },
    });
  }
  public play(player: Player) {
    player.megaCredits += 23;
    return undefined;
  }
}

