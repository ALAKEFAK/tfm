import {expect} from 'chai';
import {EarthCatapultRebalanced} from '../../../../src/cards/rebalanced/rebalanced_project/EarthCatapultRebalanced';
import {TestPlayers} from '../../../TestPlayers';
import {TestPlayer} from '../../../TestPlayer';

describe('EarthCatapult', function() {
  let card : EarthCatapultRebalanced; let player : TestPlayer;

  beforeEach(function() {
    card = new EarthCatapultRebalanced();
    player = TestPlayers.BLUE.newPlayer();
  });

  it('Should play', function() {
    const action = card.play();
    expect(action).is.undefined;
    player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
    expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    expect(card.getCardDiscount()).to.eq(2);
  });
});

