import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {BuildColony} from '../../../deferredActions/BuildColony';
import {CardRenderer} from '../../render/CardRenderer';

export class PoseidonRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      name: CardName.POSEIDON_REBALANCED,
      startingMegaCredits: 40,
      cardType: CardType.CORPORATION,
      initialActionText: 'Place a colony',

      metadata: {
        cardNumber: 'R02',
        description: 'You start with 40 M€ As your first action, place a colony.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(40).nbsp.colonies(1);
          b.corpBox('effect', (ce) => {
            ce.effect('When you place a colony, including this, raise your M€ production 2 step.', (eb) => {
              eb.colonies(1).startEffect.production((pb) => pb.megacredits(2));
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    if (player.game.gameOptions.coloniesExtension) {
      player.game.defer(new BuildColony(player, false, 'Poseidon first action - Select where to build colony'));
      return undefined;
    } else {
      console.warn('Colonies extension isn\'t selected.');
      return undefined;
    }
  }

  public play() {
    return undefined;
  }
}
