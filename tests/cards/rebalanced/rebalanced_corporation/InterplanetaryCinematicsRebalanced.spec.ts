import {expect} from 'chai';
import {Bushes} from '../../../../src/cards/base/Bushes';
import {Virus} from '../../../../src/cards/base/Virus';
import {InterplanetaryCinematicsRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/InterplanetaryCinematicsRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {TestPlayers} from '../../../TestPlayers';

describe('InterplanetaryCinematics', function() {
  let card : InterplanetaryCinematicsRebalanced; let player : Player;

  beforeEach(function() {
    card = new InterplanetaryCinematicsRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play', function() {
    card.play(player);
    expect(player.steel).to.eq(16);
  });

  it('Has onCardPlayed', function() {
    player.corporationCard = card;
    card.onCardPlayed(player, new Bushes());
    expect(player.megaCredits).to.eq(0);
    card.onCardPlayed(player, new Virus());
    expect(player.megaCredits).to.eq(3);
  });
});
