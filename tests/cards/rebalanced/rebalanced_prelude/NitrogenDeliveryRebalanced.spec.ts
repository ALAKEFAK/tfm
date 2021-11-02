import {expect} from 'chai';
import {NitrogenDeliveryRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/NitrogenDeliveryRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';

describe('NitrogenDeliveryRebalanced', function() {
  it('Should play', function() {
    const card = new NitrogenDeliveryRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getTerraformRating()).to.eq(22);
    expect(player.plants).to.eq(5);
  });
});
