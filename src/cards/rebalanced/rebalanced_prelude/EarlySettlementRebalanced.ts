import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class EarlySettlementRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.EARLY_SETTLEMENT_REBALANCED,
      tags: [Tags.BUILDING, Tags.CITY],
      productionBox: Units.of({plants: 1}),

      metadata: {
        cardNumber: 'P09',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1)).plants(3).br.city();
        }),
        description: 'Increase your plant production 1 step. Gain 3 plants. Place a city tile.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    player.plants += 3;
    player.game.defer(new PlaceCityTile(player));
    return undefined;
  }
}

