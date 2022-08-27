import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class ManOfThePeople extends PreludeCard {
  constructor() {
    super({
      name: CardName.MAN_OF_THE_PEOPLE,
      tags: [Tags.WILDCARD],

      metadata: {
        cardNumber: 'L402',
        renderData: CardRenderer.builder((b) => {
          b.effect('You have +1 influence.', (eb) => {
            eb.startEffect.influence(1);
          }).br;
          b.effect('You may ignore all turmoil party requirements.', (eb) => {
            eb.plate('Party requirements').startEffect.text('None');
          });
        }),
      },
    });
  }

  public play(player: Player) {
    if (player.game.turmoil) {
      player.game.turmoil.addInfluenceBonus(player);
      player.isManOfThePeople = true;
    }
    return undefined;
  }
}
