import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class MetalsCompanyRebalanced extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.METALS_COMPANY_REBALANCED,

      metadata: {
        cardNumber: 'P20',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1).steel(1).titanium(1));
          b.megacredits(2)
        }),
        description: 'Increase your MC, steel and titanium production 1 step. Gain 2 MC.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.TITANIUM, 1);
    player.addProduction(Resources.STEEL, 1);
    player.megaCredits += 2;
    return undefined;
  }
}
