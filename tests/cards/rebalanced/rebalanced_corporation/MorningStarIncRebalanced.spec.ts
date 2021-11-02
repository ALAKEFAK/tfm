import {expect} from 'chai';
import {IshtarMining} from '../../../../src/cards/venusNext/IshtarMining';
import {MorningStarIncRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/MorningStarIncRebalanced';
import {Game} from '../../../../src/Game';
import {TestPlayers} from '../../../TestPlayers';
import {LocalShading} from '../../../../src/cards/venusNext/LocalShading';
import {VenusGovernor} from '../../../../src/cards/venusNext/VenusGovernor';

describe('MorningStarIncRebalanced', function() {
  it('Should play', function() {
    const corp = new MorningStarIncRebalanced();
    const card = new IshtarMining();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    const game = Game.newInstance('foobar', [player, redPlayer], player);
    player.corporationCard = corp;
    game.increaseVenusScaleLevel(player, 1);
    expect(card.canPlay(player)).is.true;
    expect(game.getVenusScaleLevel()).to.eq(2);
  });


  it('Have correct discount play', function() {
    const corp = new MorningStarIncRebalanced();
    const card2 = new LocalShading();
    const card3 = new VenusGovernor();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);

    player.corporationCard = corp;
    expect(corp.getCardDiscount(player, card2)).to.eq(2);
    expect(corp.getCardDiscount(player, card3)).to.eq(4);
  });
});
