import {expect} from 'chai';
import {PolarIndustriesRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/PolarIndustriesRebalanced';
import {Game} from '../../../../src/Game';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';


describe('PolarIndustriesRebalanced', function() {
  it('Should play', function() {
    const card = new PolarIndustriesRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(2);
    expect(player.heat).to.eq(0);
    expect(player.megaCredits).to.eq(7);
  });
});
