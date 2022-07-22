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
      tags: [Tags.EARTH],
      cost: 3,

      requirements: CardRequirements.builder((b) => b.temperature(6).max()),
      metadata: {
        cardNumber: 'L301',
        // TODO: Find prettier layout
        renderData: CardRenderer.builder((b) => {
          b.text('-X').heat(1).nbsp.text('+').megacredits(0).multiplier;
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

