import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {SendDelegateToArea} from '../../../deferredActions/SendDelegateToArea';
import {Size} from '../../render/Size';

export class ManOfThePeople extends PreludeCard {
  constructor() {
    super({
      name: CardName.MAN_OF_THE_PEOPLE,
      tags: [Tags.WILDCARD],

      metadata: {
        cardNumber: 'L402',
        renderData: CardRenderer.builder((b) => {
          b.delegates(2);
          b.text('Place 1 delegate from the lobby, 1 from the reserve.', Size.SMALL).br;
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
      player.game.defer(new SendDelegateToArea(player, 'Select where to send the 1st delegate', {source: 'lobby'}));
      player.game.defer(new SendDelegateToArea(player, 'Select where to send the 2nd delegate', {source: 'reserve'}));
      player.game.turmoil.addInfluenceBonus(player);
      player.isManOfThePeople = true;
    }
    return undefined;
  }
}
