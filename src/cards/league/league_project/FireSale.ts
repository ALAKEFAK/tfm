import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';
import {Tags} from '../../Tags';

export class FireSale extends Card implements IProjectCard {
  // author: markanarmi
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.FIRE_SALE,
      tags: [Tags.SPACE, Tags.EARTH],
      cost: 3,

      requirements: CardRequirements.builder((b) => b.temperature(6).max()),
      metadata: {
        cardNumber: 'L301',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('x').heat(1).startAction.megacredits(0).multiplier;
          }).br;
        }),
        description: 'Convert all heat to M€.',
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.MEGACREDITS, player.heat, {log: true});
    return player.spendHeat(player.heat);
  }
}
