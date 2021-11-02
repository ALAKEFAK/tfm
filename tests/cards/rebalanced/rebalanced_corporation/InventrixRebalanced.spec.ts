import {expect} from 'chai';
import {InventrixRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/InventrixRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {TestPlayers} from '../../../TestPlayers';

describe('InventrixRebalanced', function() {
  let card : InventrixRebalanced; let player : Player;

  beforeEach(function() {
    card = new InventrixRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    card.play();
    expect(card.getRequirementBonus()).to.eq(3);
  });

  it('Should take initial action', function() {
    const action = card.initialAction(player);
    expect(action).is.undefined;
    expect(player.cardsInHand).has.lengthOf(3);
  });
});
