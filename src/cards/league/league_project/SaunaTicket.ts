import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';

export class SaunaTicket extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.SAUNA_TICKET,
      cost: 3,

      requirements: CardRequirements.builder((b) => b.temperature(6).max()),
      metadata: {
        cardNumber: 'L301',
        renderData: CardRenderer.builder((b) => {
          b.text('x').heat(1).startAction.megacredits(0).multiplier;
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

