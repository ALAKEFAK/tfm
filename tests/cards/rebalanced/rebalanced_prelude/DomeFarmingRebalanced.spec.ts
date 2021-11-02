import {expect} from 'chai';
import {DomeFarmingRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/DomeFarmingRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('DomeFarmingRebalanced', function() {
  it('Should play', function() {
    const card = new DomeFarmingRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(3);
  });
});
