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
      cardType: CardType.AUTOMATED,
      name: CardName.PHOBOS_SPACE_HAVEN_LEAGUE,
      tags: [Tags.SPACE, Tags.CITY],
      cost: 25,

      metadata: {
        cardNumber: 'L415',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1)).nbsp.city().asterix().br;
          b.text('Opponents may not remove your', Size.TINY, true).br;
          b.animals(1).microbes(1);
        }),
        description: 'Increase your titanium production 1 step and place a City tile ON THE RESERVED AREA. Cannot be played if PHOBOS FALLS has been played.',
        victoryPoints: 3,
      },
    });
  }

  public canPlay(player: Player): boolean {
    // Only playable if Phobos Falls has not been played yet
    return !player.game.getPlayers().some((p) => p.cardIsInEffect(CardName.PHOBOS_FALLS));
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
