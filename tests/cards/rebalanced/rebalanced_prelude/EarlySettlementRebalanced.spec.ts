import {expect} from 'chai';
import {EarlySettlementRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/EarlySettlementRebalanced';
import {Game} from '../../../../src/Game';
import {SelectSpace} from '../../../../src/inputs/SelectSpace';
import {Resources} from '../../../../src/Resources';
import {TileType} from '../../../../src/TileType';
import {TestPlayers} from '../../../TestPlayers';

describe('EarlySettlementRebalanced', function() {
  it('Should play', function() {
    const card = new EarlySettlementRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);

    card.play(player);
    const selectSpace = game.deferredActions.peek()!.execute() as SelectSpace;

    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.plants).to.eq(3);
    expect(selectSpace.cb(selectSpace.availableSpaces[0])).is.undefined;
    expect(selectSpace.availableSpaces[0].player).to.eq(player);
    expect(selectSpace.availableSpaces[0].tile).is.not.undefined;
    expect(selectSpace.availableSpaces[0].tile!.tileType).to.eq(TileType.CITY);
  });
});
