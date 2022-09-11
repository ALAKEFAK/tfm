import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class AssemblyLines extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 7,
      tags: [Tags.BUILDING],
      name: CardName.ASSEMBLY_LINES,
      cardType: CardType.AUTOMATED,
      productionBox: Units.of({megacredits: 2}),

      metadata: {
        cardNumber: 'L404',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2));
        }),
        description: 'Increase your M€ production 2 steps.',
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2);
    return undefined;
  }
}
