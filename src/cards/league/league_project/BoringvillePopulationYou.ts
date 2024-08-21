import {IProjectCard} from '../../IProjectCard';
import {Player} from '../../../Player';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Tags} from '../../Tags';
import {SelectSpace} from '../../../inputs/SelectSpace';
import {ISpace} from '../../../boards/ISpace';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class BoringvillePopulationYou extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.BORINGVILLE_POPULATION_YOU,
      tags: [Tags.CITY, Tags.BUILDING],
      cost: 22,
      productionBox: Units.of({megacredits: 2}),

      metadata: {
        cardNumber: 'L424',
        description: 'Increase your M€ production 2 steps. Place a City tile.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(2);
          }).nbsp.nbsp.city();
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.game.board.getAvailableSpacesForCity(player).length > 0;
  }

  public play(player: Player) {
    return new SelectSpace(
      'Select space for city tile',
      player.game.board.getAvailableSpacesForCity(player),
      (space: ISpace) => {
        player.game.addCityTile(player, space.id);
        player.addProduction(Resources.MEGACREDITS, 2);
        return undefined;
      },
    );
  }
}
