import {expect} from 'chai';
import {Predators} from '../../../../src/cards/base/Predators';
import {ArklightRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/ArklightRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';

describe('ArklightRebalanced', function() {
  it('Should play', function() {
    const card = new ArklightRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
    const play = card.play(player);
    expect(play).is.undefined;
    expect(card.resourceCount).to.eq(1);
    player.corporationCard = card;
    card.onCardPlayed(player, new Predators());
    expect(card.resourceCount).to.eq(2);
    expect(card.getVictoryPoints()).to.eq(1);
  });
});
