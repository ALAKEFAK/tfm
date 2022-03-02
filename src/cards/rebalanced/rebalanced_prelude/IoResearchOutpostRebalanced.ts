import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class IoResearchOutpostRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.IO_RESEARCH_OUTPOST_REBALANCED,
      tags: [Tags.JOVIAN, Tags.SCIENCE],

      metadata: {
        cardNumber: 'P16',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1)).br;
          b.cards(2);
        }),
        description: 'Increase your titanium production 1 step. Draw 2 cards.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.TITANIUM, 1);
    player.drawCard(2);
    return undefined;
  }
}
