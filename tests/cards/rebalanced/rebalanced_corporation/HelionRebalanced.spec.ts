import {expect} from 'chai';
import {ConvertHeat} from '../../../../src/cards/base/standardActions/ConvertHeat';
import {HelionRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/HelionRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';
import {Game} from '../../../../src/Game';

describe('HelionRebalanced', function() {
  it('Should play', function() {
    const card = new HelionRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(4);
    expect(player.canUseHeatAsMegaCredits).is.true;


    expect(player.heatNeededForTemperature).to.eq(7);

    const convert = new ConvertHeat();
    expect(convert.canAct(player)).eq(false);
    player.heat = 7;
    expect(convert.canAct(player)).eq(true);
  });
});
