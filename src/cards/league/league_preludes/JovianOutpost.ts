import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../../render/CardRenderDynamicVictoryPoints';
import {Resources} from '../../../Resources';

export class JovianOutpost extends PreludeCard {
  // Kyshantry
  constructor() {
    super({
      name: CardName.JOVIAN_OUTPOST,
      tags: [Tags.JOVIAN, Tags.SPACE],

      metadata: {
        cardNumber: 'L423',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1).titanium(1)).br;
          b.titanium(2).br;
          b.vpText('1 VP per 2 Jovian tags you have.');
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.jovians(1, 2),
      },
    });
  }

  public getVictoryPoints(player: Player) {
    return Math.floor(player.getTagCount(Tags.JOVIAN, false, false) / 2);
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 1);
    player.addProduction(Resources.TITANIUM, 1);
    return undefined;
  }
}
