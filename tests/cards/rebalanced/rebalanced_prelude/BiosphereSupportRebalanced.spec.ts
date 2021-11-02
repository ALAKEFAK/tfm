import {expect} from 'chai';
import {BiosphereSupportRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/BiosphereSupportRebalanced';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('BiosphereSupportRebalanced', function() {
  let card : BiosphereSupportRebalanced; let player : Player;

  beforeEach(function() {
    card = new BiosphereSupportRebalanced();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Can play', function() {
    player.addProduction(Resources.MEGACREDITS, -5);
    expect(card.canPlay(player)).is.true;
  });

  it('Should play', function() {
    expect(card.canPlay(player)).is.true;
    card.play(player);
    expect(player.getProduction(Resources.PLANTS)).to.eq(2);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
  });
});
