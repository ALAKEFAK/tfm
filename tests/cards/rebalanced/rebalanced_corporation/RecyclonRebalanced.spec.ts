import {expect} from 'chai';
import {RecyclonRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/RecyclonRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('RecyclonRebalanced', function() {
  it('Should play', function() {
    const card = new RecyclonRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const play = card.play(player);
    expect(play).is.undefined;
    expect(player.getProduction(Resources.STEEL)).to.eq(2);
    expect(card.resourceCount).to.eq(1);
  });
});
