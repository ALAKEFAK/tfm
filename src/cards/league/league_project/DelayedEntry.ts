import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class DelayedEntry extends Card implements IProjectCard {
  // author: mortaum
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.DELAYED_ENTRY,
      cost: 0,

      metadata: {
        cardNumber: 'L308',
        renderData: CardRenderer.builder((b) => {
          b.effect('Play as your first and only action this turn.', (eb) => {
            eb.text('1').startAction;
          }).br;
          b.effect('On your next turn, take three actions.', (eb) => {
            eb.text('3').startAction;
          }).br;
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    return super.canPlay(player) && player.actionsTakenThisRound === 0;
  }

  public play(player: Player) {
    // TODO: Prettier solution? Check: Player.ts line 1933 - 1935
    player.actionsTakenThisRound = 10;
    player.maxActionsThisRound = 3;
    return undefined;
  }
}
