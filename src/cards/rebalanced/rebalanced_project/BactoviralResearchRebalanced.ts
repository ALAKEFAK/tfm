import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {ResourceType} from '../../../ResourceType';
import {SelectCard} from '../../../inputs/SelectCard';
import {ICard} from '../../ICard';

export class BactoviralResearchRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.BACTOVIRAL_RESEARCH_REBALANCED,
      tags: [Tags.MICROBE, Tags.SCIENCE],
      cost: 10,
      metadata: {
        cardNumber: 'X37',
        renderData: CardRenderer.builder((b) => {
          b.cards(1).br.br; // double br is intentional for visual appeal
          b.microbes(1).asterix().slash().microbes(1).played;
        }),
        description: 'Draw a card. Choose any one microbe card and add a microbe to it for each microbe tag you have, including this.',
      },
    });
  }

  public play(player: Player) {
    player.drawCard();

    const microbeTags: number = player.getTagCount(Tags.MICROBE) + 1;
    const microbeCards = player.getResourceCards(ResourceType.MICROBE);

    if (microbeCards.length === 0) {
      return undefined;
    } else if (microbeCards.length === 1) {
      player.addResourceTo(microbeCards[0], {qty: microbeTags, log: true});
    } else if (microbeCards.length > 1) {
      return new SelectCard(
        'Select card to add ' + microbeTags + ' microbe(s)',
        'Add microbe(s)',
        microbeCards,
        (foundCards: Array<ICard>) => {
          player.addResourceTo(foundCards[0], {qty: microbeTags, log: true});
          return undefined;
        },
      );
    }
    return undefined;
  }
}
