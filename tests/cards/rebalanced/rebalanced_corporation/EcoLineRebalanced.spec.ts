import {expect} from 'chai';
import {EcoLineRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/EcoLineRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';
import {ConvertPlants} from '../../../../src/cards/base/standardActions/ConvertPlants';
import {Game} from '../../../../src/Game';

describe('EcoLine', function() {
  it('Should play', function() {
    const card = new EcoLineRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    const action = card.play(player);
    player.corporationCard = card;
    expect(action).is.undefined;
    // expect(player.megaCredits).to.eq(42);
    expect(player.getProduction(Resources.PLANTS)).to.eq(3);
    expect(player.plants).to.eq(0);
    expect(player.plantsNeededForGreenery).to.eq(8);

    const convert = new ConvertPlants();
    player.plants = 7;
    expect(convert.canAct(player)).eq(false);
    player.plants = 8;
    expect(convert.canAct(player)).eq(true);

    const action2 = convert.action(player);
    expect(action2).not.eq(undefined);
    action2.cb(action2.availableSpaces[0]);
    expect(player.plants).to.eq(0);
  });
});
