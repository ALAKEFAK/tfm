import {expect} from 'chai';
import {CelesticRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/CelesticRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';

describe('Celestic', function() {
  it('Should play', function() {
    const card = new CelesticRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
    const play = card.play();
    expect(play).is.undefined;

    player.corporationCard = card;

    const action = card.action(player);
    expect(action).is.undefined;
    expect(card.resourceCount).to.eq(1);
    player.addResourceTo(card, 4);
    expect(card.getVictoryPoints()).to.eq(1);
  });
});
