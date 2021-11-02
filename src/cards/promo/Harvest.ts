import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';

export class Harvest extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.HARVEST,
      tags: [Tags.PLANT],
      cost: 4,
      requirements: CardRequirements.builder((b) => b.greeneries(3)),

      metadata: {
        cardNumber: 'X37',
        description: 'Requires that you have 3 greenery tiles in play. Gain 12 M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(12);
        }),
      },
    });
  }

  public play(player: Player) {
    player.addResource(Resources.MEGACREDITS, 12, {log: true});
    return undefined;
  }
}
