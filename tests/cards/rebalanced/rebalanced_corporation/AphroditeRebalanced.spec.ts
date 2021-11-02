import {expect} from 'chai';
import {AphroditeRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/AphroditeRebalanced';
import {Game} from '../../../../src/Game';
import {Phase} from '../../../../src/Phase';
import {Resources} from '../../../../src/Resources';
import {TestingUtils} from '../../../TestingUtils';
import {TestPlayers} from '../../../TestPlayers';

describe('AphroditeRebalanced', function() {
  it('Should play', function() {
    const card = new AphroditeRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, player2], player);
    const action = card.play(player);
    expect(action).is.undefined;
    player.corporationCard = card;
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    game.phase = Phase.ACTION;

    // aphrodite increases venus
    game.increaseVenusScaleLevel(player, 2);
    expect(game.deferredActions).has.lengthOf(2);
    TestingUtils.runAllActions(game);
    expect(game.getVenusScaleLevel()).to.eq(4);
    expect(player.megaCredits).to.eq(10);

    // different player increases venus
    game.increaseVenusScaleLevel(player2, 2);
    expect(game.deferredActions).has.lengthOf(2);
    TestingUtils.runAllActions(game);
    expect(game.getVenusScaleLevel()).to.eq(8);
    expect(player.megaCredits).to.eq(16);
    expect(player2.megaCredits).to.eq(4);
  });
});
