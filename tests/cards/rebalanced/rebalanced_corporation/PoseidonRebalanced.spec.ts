import {expect} from 'chai';
import {PoseidonRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/PoseidonRebalanced';
import {Ceres} from '../../../../src/colonies/Ceres';
import {Game} from '../../../../src/Game';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

// TODO: add a test for Posideon's initial action.

describe('PoseidonRebalanced', function() {
  it('Should play', function() {
    const card = new PoseidonRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
    const play = card.play();
    expect(play).is.undefined;
    player.corporationCard = card;
    const ceres = new Ceres();
    ceres.addColony(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    ceres.addColony(player2);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
    expect(player2.getProduction(Resources.STEEL)).to.eq(1);
  });
});
