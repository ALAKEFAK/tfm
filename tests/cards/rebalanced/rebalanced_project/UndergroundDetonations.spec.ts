import {expect} from 'chai';
import {UndergroundDetonationsRebalanced} from '../../../../src/cards/rebalanced/rebalanced_project/UndergroundDetonationsRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('UndergroundDetonations', function() {
  let card : UndergroundDetonationsRebalanced; let player : Player; let game : Game;

  beforeEach(function() {
    card = new UndergroundDetonationsRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Can\'t act', function() {
    player.megaCredits = 7;
    expect(card.canAct(player)).is.not.true;
  });

  it('Should act', function() {
    player.megaCredits = 8;
    expect(card.canAct(player)).is.true;

    card.action(player);
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(0);
    expect(player.getProduction(Resources.HEAT)).to.eq(2);
  });
});
