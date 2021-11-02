import {expect} from 'chai';
import {UnitedNationsMarsInitiativeRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/UnitedNationsMarsInitiativeRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {TestPlayers} from '../../../TestPlayers';

describe('UnitedNationsMarsInitiative', function() {
  let card : UnitedNationsMarsInitiativeRebalanced; let player : Player;

  beforeEach(function() {
    card = new UnitedNationsMarsInitiativeRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Can\'t act if TR was not raised', function() {
    player.megaCredits = 10;
    expect(card.canAct(player)).is.not.true;
  });

  it('Can\'t act if not enough MC', function() {
    player.setTerraformRating(21);
    player.megaCredits = 0;
    expect(card.canAct(player)).is.not.true;
  });

  it('Should act', function() {
    player.increaseTerraformRating();
    player.megaCredits = 1;
    expect(card.canAct(player)).is.true;

    card.action(player);
    expect(player.megaCredits).to.eq(0);
    expect(player.getTerraformRating()).to.eq(22);
  });
});
