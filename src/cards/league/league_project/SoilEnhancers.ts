import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {ISpace} from '../../../boards/ISpace';
import {TileType} from '../../../TileType';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Priority} from '../../../deferredActions/DeferredAction';
import {GainResources} from '../../../deferredActions/GainResources';
import {CardRenderer} from '../../render/CardRenderer';
import {SpaceType} from '../../../SpaceType';
import {Size} from '../../render/Size';

export class SoilEnhancers extends Card implements IProjectCard {
  // hodgepodge
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.SOIL_ENHANCERS,
      tags: [Tags.MICROBE],
      cost: 7,

      metadata: {
        description: 'Every time you place a non-ocean tile ON MARS, gain 1 plant.',
        cardNumber: 'L420',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (be) => be.emptyTile('normal', Size.SMALL).asterix().startEffect.plants(1)).br;
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (cardOwner.id === activePlayer.id && space.tile?.tileType !== TileType.OCEAN && space.spaceType !== SpaceType.COLONY) {
      cardOwner.game.defer(
        new GainResources(cardOwner, Resources.PLANTS, {
          count: 1,
          cb: () => activePlayer.game.log(
            '${0} gained 1 ${1} from ${2}',
            (b) => b.player(cardOwner).string(Resources.PLANTS).cardName(this.name)),
        }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }

  public play() {
    return undefined;
  }
}
