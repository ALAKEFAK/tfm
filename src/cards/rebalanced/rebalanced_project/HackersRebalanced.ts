import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class HackersRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.HACKERS_REBALANCED,
      cost: 3,

      metadata: {
        cardNumber: '125',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).megacredits(1).any.br;
            pb.plus().megacredits(3);
          });
        }),
        description: 'Decrease your energy production 1 step and EACH OPPONENTS M€ production 1 step. Increase your M€ production 3 steps.',
        victoryPoints: -1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.ENERGY) >= 1;
  }

  public play(player: Player) {
    const opponents = player.game.getPlayers().filter((p) => p.id !== player.id && p.canAdjustProduction(Units.of({megacredits: -1})));
    opponents.forEach((p) => {
      p.adjustProduction(Units.of({megacredits: -1}), {log: true, from: player});
      return undefined;
    });
    player.addProduction(Resources.MEGACREDITS, 3);
    player.addProduction(Resources.ENERGY, -1);
    return undefined;
  }

  public getVictoryPoints() {
    return -1;
  }
}

