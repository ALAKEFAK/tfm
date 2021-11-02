import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class TollStationRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.TOLL_STATION_REBALANCED,
      tags: [Tags.SPACE],
      cost: 12,

      metadata: {
        cardNumber: '099',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).slash().space().played.any.asterix();
          });
        }),
        description: 'Increase your M€ production 1 step for each space tag of the OPPONENT who has the most space tags.',
      },
    });
  }
  public play(player: Player) {
    if (player.game.isSoloMode()) {
      return undefined;
    }

    const opponentSpaceTagCounts = player.game.getPlayers()
      .filter((aPlayer) => aPlayer !== player)
      .map((opponent) => opponent.getTagCount(Tags.SPACE, false, false));
    const maxOpponentSpaceTagCount = Math.max(...opponentSpaceTagCounts);
    player.addProduction(Resources.MEGACREDITS, maxOpponentSpaceTagCount, {log: true});
    return undefined;
  }
}
