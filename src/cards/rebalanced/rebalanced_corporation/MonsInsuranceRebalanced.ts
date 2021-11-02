import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class MonsInsuranceRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.MONS_INSURANCE_REBALANCED,
      startingMegaCredits: 48,

      metadata: {
        cardNumber: 'R46',
        description: 'You start with 48 M€. Increase your M€ production 2 step per opponent. ALL OPPONENTS DECREASE THEIR M€ production 2 STEPS. THIS DOES NOT TRIGGER THE EFFECT BELOW.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(48).production((pb) => {
            pb.megacredits(2).asterix().nbsp.megacredits(-2).any.asterix();
          });
          b.corpBox('effect', (cb) => {
            cb.vSpace(Size.LARGE);
            cb.effect('When a player causes another player to decrease production or lose resources, pay 2M€ to the victim, or as much as possible.', (eb) => {
              eb.production((pb) => pb.wild(1).any).or().minus().wild(1).any;
              eb.startEffect.text('pay', Size.SMALL, true).megacredits(2);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    let opponentCount = 0;
    for (const p of player.game.getPlayers()) {
      if (p.id !== player.id) {
        p.addProduction(Resources.MEGACREDITS, -2, {log: true, from: player});
        opponentCount += 1;
      }
    }

    // Neutral opponent for solo mode
    if (player.game.isSoloMode()) {
      opponentCount = 1;
    }

    player.addProduction(Resources.MEGACREDITS, 2 * opponentCount, {log: true});
    player.game.monsInsuranceOwner = player.id;
    return undefined;
  }
}
