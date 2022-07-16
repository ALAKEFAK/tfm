import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {CardRequirements} from '../../CardRequirements';

export class Incinerator extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.INCINERATOR,
      cost: 8,
      tags: [Tags.BUILDING],

      requirements: CardRequirements.builder((b) => b.oxygen(5)),
      metadata: {
        cardNumber: 'L303',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.plants(1).startAction.heat(6);
          }).br;
        }),
        description: 'Spend 1 plant to gain 6 heat.',
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.plants > 0;
  }

  public action(player: Player) {
    player.plants -= 1;
    player.heat += 6;
    return undefined;
  }
}
