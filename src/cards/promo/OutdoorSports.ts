import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {Board} from '../../boards/Board';
import {Resources} from '../../Resources';

export class OutdoorSports extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.OUTDOOR_SPORTS,
      cost: 8,

      requirements: CardRequirements.builder((b) => b.cities(1).any().oceans(1)),
      metadata: {
        cardNumber: 'X38',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(2);
          });
        }),
        description: 'Requires any city adjacent to an ocean. Increase your M€ production 2 steps.',
        victoryPoints: 1,
      },
    });
  }

  public canPlay(player: Player) {
    const board = player.game.board;
    const oceans = board.getOceansTiles(true);
    return oceans.some((ocean) => board.getAdjacentSpaces(ocean).some((space) => Board.isCitySpace(space)));
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2);
    return undefined;
  }
}
