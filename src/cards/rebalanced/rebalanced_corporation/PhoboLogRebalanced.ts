import {Card} from '../../Card';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {CorporationCard} from '../../corporation/CorporationCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class PhoboLogRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.PHOBOLOG_REBALANCED,
      tags: [Tags.SPACE],
      startingMegaCredits: 30,
      initialActionText: 'Draw 2 cards with a space tag',

      metadata: {
        cardNumber: 'R09',
        description: 'You start with 8 titanium and 30 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a space tag. Take them into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(30).nbsp.titanium(8).digit.cards(2).secondaryTag(Tags.SPACE);
          b.corpBox('effect', (ce) => {
            ce.effect('Your titanium resources are each worth 1 M€ extra.', (eb) => {
              eb.titanium(1).startEffect.plus(Size.SMALL).megacredits(1);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    player.drawCard(2, {tag: Tags.SPACE});
    return undefined;
  }

  public play(player: Player) {
    player.titanium = 8;
    player.increaseTitaniumValue();
    return undefined;
  }
}
