import {Card} from '../../Card';
import {CorporationCard} from './../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class HelionRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.HELION_REBALANCED,
      tags: [Tags.SPACE],
      startingMegaCredits: 40,

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 4 heat production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(4).digit).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect('You may use heat as MC. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(0).multiplier;
            });
            ce.effect('You may always spend 7 heat, instead of 8, to raise a temperature.', (eb) => {
              eb.heat(7).digit.startAction.temperature(1);
            });
          });
        }),
      },
    });
  }
  public play(player: Player) {
    player.canUseHeatAsMegaCredits = true;
    player.heatNeededForTemperature = 7;
    player.addProduction(Resources.HEAT, 4);
    return undefined;
  }
}
