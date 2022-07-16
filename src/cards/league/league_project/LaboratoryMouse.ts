import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {CardRequirements} from '../../CardRequirements';
import {CardRenderDynamicVictoryPoints} from '../../render/CardRenderDynamicVictoryPoints';

export class LaboratoryMouse extends Card implements IProjectCard {
  public resourceCount = 0;

  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.LABORATORY_MOUSE,
      cost: 9,
      tags: [Tags.SCIENCE, Tags.ANIMAL],

      requirements: CardRequirements.builder((b) => b.oxygen(4)),
      metadata: {
        cardNumber: 'L305',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 Animal to this card.', (eb) => {
            eb.empty().startAction.animals(1);
          }).br;
          b.animals(1).br;
          b.vpText('1 VP per 3 Animals on this card.');
        }),
        description: 'Add 1 Animal to this card.',
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 3),
      },
    });
  }

  public play(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }

  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 3);
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
