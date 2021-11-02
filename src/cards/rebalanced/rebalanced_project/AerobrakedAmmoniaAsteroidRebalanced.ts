import {ICard} from '../../ICard';
import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {SelectCard} from '../../../inputs/SelectCard';
import {Resources} from '../../../Resources';
import {ResourceType} from '../../../ResourceType';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class AerobrakedAmmoniaAsteroidRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.AEROBRAKED_AMMONIA_ASTEROID_REBALANCED,
      tags: [Tags.SPACE],
      cost: 26,

      metadata: {
        description: 'Increase your heat production 4 steps and your plant production 1 step. Add 3 Microbes to ANOTHER card.',
        cardNumber: '170',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.heat(4).br;
            pb.plants(1);
          }).br;
          b.microbes(3).asterix();
        }),
      },
    });
  }

  public play(player: Player) {
    const cardsToPick = player.getResourceCards(ResourceType.MICROBE);
    player.addProduction(Resources.HEAT, 4);
    player.addProduction(Resources.PLANTS, 1);

    if (cardsToPick.length < 1) return undefined;

    if (cardsToPick.length === 1) {
      player.addResourceTo(cardsToPick[0], {qty: 3, log: true});
      return undefined;
    }

    return new SelectCard('Select card to add 3 microbes', 'Add microbes', cardsToPick, (foundCards: Array<ICard>) => {
      player.addResourceTo(foundCards[0], {qty: 3, log: true});
      return undefined;
    });
  }
}
