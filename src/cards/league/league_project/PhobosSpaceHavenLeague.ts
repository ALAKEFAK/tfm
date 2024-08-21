import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {SpaceName} from '../../../SpaceName';
import {SpaceType} from '../../../SpaceType';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class PhobosSpaceHavenLeague extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.PHOBOS_SPACE_HAVEN_LEAGUE,
      tags: [Tags.SPACE, Tags.CITY],
      cost: 25,

      metadata: {
        cardNumber: 'L416',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1)).nbsp.city().asterix().br;
          b.text('Opponents may not remove your', Size.TINY, true).br;
          b.animals(1).microbes(1);
        }),
        description: 'Increase your titanium production 1 step and place a City tile ON THE RESERVED AREA',
        victoryPoints: 3,
      },
    });
  }

  public canPlay(): boolean {
    return true;
  }

  public play(player: Player) {
    player.game.addCityTile(player, SpaceName.PHOBOS_SPACE_HAVEN, SpaceType.COLONY);
    player.addProduction(Resources.TITANIUM, 1);
    return undefined;
  }

  public getVictoryPoints() {
    return 3;
  }
}
