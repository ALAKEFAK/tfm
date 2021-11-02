import {expect} from 'chai';
import {PhoboLogRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/PhoboLogRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';

describe('PhoboLogRebalanced', function() {
  it('Should play', function() {
    const card = new PhoboLogRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.titanium).to.eq(8);
    expect(player.getTitaniumValue()).to.eq(4);
  });
});
