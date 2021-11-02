import {expect} from 'chai';
import {MoholeRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/MoholeRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('MoholeRebalanced', function() {
  it('Should play', function() {
    const card = new MoholeRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(3);
    expect(player.heat).to.eq(0);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player.energy).to.eq(3);
  });
});
