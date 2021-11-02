import {expect} from 'chai';
import {HugeAsteroidRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/HugeAsteroidRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('HugeAsteroidRebalanced', function() {
  let card : HugeAsteroidRebalanced; let player : Player; let game : Game;

  beforeEach(function() {
    card = new HugeAsteroidRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);
  });

  it('Should play', function() {
    player.megaCredits = 2;
    expect(card.canPlay(player)).is.true;
    const initialTR = player.getTerraformRating();

    card.play(player);

    // SelectHowToPayDeferred
    game.deferredActions.runNext();

    expect(player.megaCredits).to.eq(2);
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
    expect(player.getTerraformRating()).to.eq(initialTR + 3);
  });
});
