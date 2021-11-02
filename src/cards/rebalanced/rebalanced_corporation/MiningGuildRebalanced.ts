import {Card} from '../../Card';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {CorporationCard} from '../../corporation/CorporationCard';
import {Phase} from '../../../Phase';
import {ISpace} from '../../../boards/ISpace';
import {SpaceBonus} from '../../../SpaceBonus';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {GainProduction} from '../../../deferredActions/GainProduction';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';
import {BoardType} from '../../../boards/BoardType';
import {Size} from '../../render/Size';
import {SelectMiningGuildBonus} from '../../../deferredActions/SelectMiningGuildBonus';

export class MiningGuildRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MINING_GUILD_REBALANCED,
      tags: [Tags.BUILDING, Tags.BUILDING],
      startingMegaCredits: 36,
      productionBox: Units.of({steel: 1}),

      metadata: {
        cardNumber: 'R24',
        description: 'You start with 36 M€, 2 steel and 1 steel production.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(36).nbsp.steel(2).digit.nbsp.production((pb) => pb.steel(1));
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you get any steel as a placement bonus on the map, increase your steel production 1 step. Same for titanium.', (eb) => {
              eb.steel(1).asterix().colon();
              eb.production((pb) => pb.steel(1)).or(Size.TINY);
              eb.titanium(1).asterix();
              eb.startEffect.production((pb) => pb.titanium(1));
            });
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace, boardType: BoardType) {
    // TODO(kberg): Clarify that this is nerfed for The Moon.
    // Nerfing on The Moon.
    if (boardType !== BoardType.MARS) {
      return;
    }
    if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase.SOLAR) {
      return;
    }
    // Don't grant a bonus if the card is overplaced (like Ares Ocean City)
    if (space?.tile?.covers !== undefined) {
      return;
    }
    if (space.bonus.includes(SpaceBonus.STEEL) && space.bonus.includes(SpaceBonus.TITANIUM)) {
      cardOwner.game.defer(new SelectMiningGuildBonus(cardOwner));
    } else if (space.bonus.includes(SpaceBonus.STEEL)) {
      cardOwner.game.defer(new GainProduction(cardOwner, Resources.STEEL));
    } else if (space.bonus.includes(SpaceBonus.TITANIUM)) {
      cardOwner.game.defer(new GainProduction(cardOwner, Resources.TITANIUM));
    }
    return;
  }

  public play(player: Player) {
    player.steel = 2;
    player.addProduction(Resources.STEEL, 1);
    return undefined;
  }
}
