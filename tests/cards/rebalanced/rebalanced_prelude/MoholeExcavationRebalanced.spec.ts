import {expect} from 'chai';
import {MoholeExcavationRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/MoholeExcavationRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('MoholeExcavationRebalanced', function() {
  it('Should play', function() {
    const card = new MoholeExcavationRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(2);
    expect(player.steel).to.eq(5);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
  });
});
