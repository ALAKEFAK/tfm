import {expect} from 'chai';
import {FactorumRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/FactorumRebalanced';
import {Game} from '../../../../src/Game';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('FactorumRebalanced', function() {
  it('Should play', function() {
    const card = new FactorumRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
    const play = card.play(player);
    expect(play).is.undefined;
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    player.megaCredits = 10;

    player.corporationCard = card;

    card.action(player);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player.cardsInHand).has.lengthOf(0);
    expect(player.megaCredits).to.eq(10);

    player.energy = 2;
    card.action(player);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player.cardsInHand).has.lengthOf(1);
    expect(player.megaCredits).to.eq(10);
    expect(player.energy).to.eq(1);
  });
});
