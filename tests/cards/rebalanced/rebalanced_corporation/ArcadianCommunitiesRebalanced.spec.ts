import {expect} from 'chai';
import {ArcadianCommunitiesRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/ArcadianCommunitiesRebalanced';
import {Game} from '../../../../src/Game';
import {SelectSpace} from '../../../../src/inputs/SelectSpace';
import {Resources} from '../../../../src/Resources';
import {TestingUtils} from '../../../TestingUtils';
import {TestPlayers} from '../../../TestPlayers';


describe('ArcadianCommunitiesRebalanced', function() {
  it('Should play', function() {
    const card = new ArcadianCommunitiesRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
    const play = card.play(player);
    expect(play).is.undefined;
    expect(player.steel).to.eq(10);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    player.corporationCard = card;

    const initLands = player.game.board.getAvailableSpacesForGreenery(player);
    initLands[1].player = player;
    const action = card.action(player);
    expect(action instanceof SelectSpace).is.true;
    if ( ! (action instanceof SelectSpace)) return;

    const lands = player.game.board.getAvailableSpacesForMarker(player);
    action.cb(lands[0]);

    player.game.addCityTile(player, lands[0].id);
    TestingUtils.runAllActions(player.game);
    expect(player.megaCredits).to.eq(3);
  });
});
