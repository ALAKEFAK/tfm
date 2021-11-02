import {expect} from 'chai';
import {BusinessNetwork} from '../../../../src/cards/base/BusinessNetwork';
import {PowerPlant} from '../../../../src/cards/base/PowerPlant';
import {IProjectCard} from '../../../../src/cards/IProjectCard';
import {TerralabsResearchRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/TerralabsResearchRebalanced';
import {Game} from '../../../../src/Game';
import {AndOptions} from '../../../../src/inputs/AndOptions';
import {SelectCard} from '../../../../src/inputs/SelectCard';
import {TestPlayers} from '../../../TestPlayers';

describe('TerralabsResearchRebalanced', function() {
  it('Should play', function() {
    const card = new TerralabsResearchRebalanced();
    const card2 = new PowerPlant();
    const card3 = new BusinessNetwork();
    const player = TestPlayers.BLUE.newPlayer();
    const game = Game.newInstance('foobar', [player], player);
    const pi = player.getWaitingFor() as AndOptions;
    pi.options[0].cb([card]);
    pi.options[1].cb([card2, card2]);
    pi.cb();

    // 25 starting MC - 1 for each card select at the start (total: 2)
    expect(player.megaCredits).to.eq(23);
    // 14 Solo TR - 1
    expect(player.getTerraformRating()).to.eq(13);

    player.playedCards.push(card3);
    const action = card3.action(player);
    expect(action).is.not.undefined;
    expect(action instanceof SelectCard).is.true;
    (action as SelectCard<IProjectCard>).cb([(action as SelectCard<IProjectCard>).cards[0]]);
    game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(22);
    expect(player.cardsInHand).has.lengthOf(3);
  });
});
