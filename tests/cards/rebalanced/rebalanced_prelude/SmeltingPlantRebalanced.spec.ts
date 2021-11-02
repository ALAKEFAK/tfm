import {expect} from 'chai';
import {SmeltingPlantRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/SmeltingPlantRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';

describe('SmeltingPlantRebalanced', function() {
  it('Should play', function() {
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('bar', [player], player);
    const card = new SmeltingPlantRebalanced();
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.steel).to.eq(6);
    expect(game.getOxygenLevel()).to.eq(2);
  });
});
