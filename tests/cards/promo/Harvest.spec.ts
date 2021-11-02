import {expect} from 'chai';
import {Harvest} from '../../../src/cards/promo/Harvest';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestPlayers';

describe('Harvest', function() {
  let card : Harvest; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new Harvest();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);
  });

  it('Can\'t play', function() {
    // Can't play with no greenery
    expect(card.canPlay(player)).is.not.true;

    // Can't play with one greenery
    const landSpace = game.board.getAvailableSpacesOnLand(player)[0];
    game.addGreenery(player, landSpace.id);
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    // Can play with three greenery tiles
    const landSpaces = game.board.getAvailableSpacesOnLand(player);
    game.addGreenery(player, landSpaces[0].id);
    game.addGreenery(player, landSpaces[1].id);
    game.addGreenery(player, landSpaces[2].id);
    expect(card.canPlay(player)).is.true;

    expect(player.megaCredits).to.eq(0);
    card.play(player);
    expect(player.megaCredits).to.eq(12);
  });
});
