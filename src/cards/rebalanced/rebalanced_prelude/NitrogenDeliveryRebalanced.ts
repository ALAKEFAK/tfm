import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';

export class NitrogenDeliveryRebalanced extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT_REBALANCED,
      tags: [Tags.EARTH],
      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).plants(5).digit;
        }),
        description: 'Increase your TR 2 step. Gain 5 plant.',
      },
    });
  }
  public play(player: Player) {
    player.plants += 5;
    player.increaseTerraformRating();
    player.increaseTerraformRating();
    return undefined;
  }
}
