import {expect} from 'chai';
import {SocietySupportRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/SocietySupportRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('SocietySupportRebalanced', function() {
  let card : SocietySupportRebalanced; let player : Player; let game: Game;

  beforeEach(function() {
    card = new SocietySupportRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('foobar', [player], player);
  });

  it('Can\'t play', function() {
    player.megaCredits = 2;
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.megaCredits = 3;

    const action = card.play(player);
    // SelectHowToPayDeferred
    game.deferredActions.runNext();

    expect(action).is.undefined;
    expect(player.megaCredits).to.eq(0);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(0);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
  });
});
