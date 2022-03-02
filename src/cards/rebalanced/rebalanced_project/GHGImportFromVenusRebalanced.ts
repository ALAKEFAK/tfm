import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {MAX_VENUS_SCALE, REDS_RULING_POLICY_COST} from '../../../constants';
import {PartyHooks} from '../../../turmoil/parties/PartyHooks';
import {PartyName} from '../../../turmoil/parties/PartyName';
import {LogHelper} from '../../../LogHelper';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';
import {Card} from '../../Card';
import {AphroditeRebalanced} from '../../rebalanced/rebalanced_corporation/AphroditeRebalanced';

export class GHGImportFromVenusRebalanced extends Card {
  constructor() {
    super({
      name: CardName.GHG_IMPORT_FROM_VENUS_REBALANCED,
      cardType: CardType.EVENT,
      tags: [Tags.SPACE, Tags.VENUS],
      cost: 20,

      metadata: {
        description: 'Raise Venus 1 step. Increase your heat production 3 steps.',
        cardNumber: '228',
        renderData: CardRenderer.builder((b) => {
          b.venus(1).production((pb) => {
            pb.heat(3);
          });
        }),
      },
    });
  };

  public canPlay(player: Player): boolean {
    const venusMaxed = player.game.getVenusScaleLevel() === MAX_VENUS_SCALE;
    if (PartyHooks.shouldApplyPolicy(player.game, PartyName.REDS) && !venusMaxed) {
      const adjustedCost = player.getCardCost(this) + REDS_RULING_POLICY_COST - AphroditeRebalanced.rebalancedAphroditeBonus(player, 1);
      return player.canAfford(adjustedCost, {titanium: true, floaters: true});
    }

    return true;
  }

  public play(player: Player) {
    player.addProduction(Resources.HEAT, 3);
    player.game.increaseVenusScaleLevel(player, 1);
    return undefined;
  }
}
