import {expect} from 'chai';
import {StormCraftIncorporatedRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/StormCraftIncorporatedRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {TestPlayers} from '../../../TestPlayers';

describe('StormCraftIncorporatedRebalanced', function() {
  let card : StormCraftIncorporatedRebalanced; let player : Player;

  beforeEach(function() {
    card = new StormCraftIncorporatedRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);

    player.corporationCard = card;
  });

  it('Should play', function() {
    const play = card.play();
    expect(play).is.undefined;

    const action = card.action(player);
    expect(action).is.undefined;
    expect(card.resourceCount).to.eq(1);
  });
});
