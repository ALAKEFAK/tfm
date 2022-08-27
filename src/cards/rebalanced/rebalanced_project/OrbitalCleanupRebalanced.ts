import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';


export class OrbitalCleanupRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ORBITAL_CLEANUP_REBALANCED,
      tags: [Tags.EARTH, Tags.SPACE],
      cost: 14,

      metadata: {
        cardNumber: 'X08',
        renderData: CardRenderer.builder((b) => {
          b.action('Gain 1 M€ per every two Science tag you have.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().science(2).played;
          });
        }),
        victoryPoints: 2,
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addResource(Resources.MEGACREDITS, player.getTagCount(Tags.SCIENCE) / 2, {log: true});
    return undefined;
  }

  public getVictoryPoints() {
    return 2;
  }
}
