import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';

export class MatingSeason extends Card implements IProjectCard {
  // author: Kyshantry
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.MATING_SEASON,
      cost: 5,
      tags: [Tags.ANIMAL],

      metadata: {
        cardNumber: 'L306',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('2').animals(1).startAction.text('+1').animals(1);
          }).br;
        }),
        description: 'Add an animal to each of your cards with at least two animals on it.',
      },
    });
  }

  public play(player: Player) {
    player.getCardsWithResources().forEach((card) => {
      if (card.tags.filter((tag) => tag === Tags.ANIMAL).length === 0 || card.resourceCount === undefined) return undefined;
      if (card.resourceCount >= 2) player.addResourceTo(card);
      return undefined;
    });
    return undefined;
  }
}
