import {expect} from 'chai';
import {BusinessNetwork} from '../../../../src/cards/base/BusinessNetwork';
import {EarthCatapult} from '../../../../src/cards/base/EarthCatapult';
import {PowerPlant} from '../../../../src/cards/base/PowerPlant';
import {PolyphemosRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/PolyphemosRebalanced';
import {IProjectCard} from '../../../../src/cards/IProjectCard';
import {Game} from '../../../../src/Game';
import {AndOptions} from '../../../../src/inputs/AndOptions';
import {SelectCard} from '../../../../src/inputs/SelectCard';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('PolyphemosRebalanced', function() {
  it('Should play', function() {
    const card = new PolyphemosRebalanced();
    const card2 = new PowerPlant();
    const card3 = new BusinessNetwork();
    const player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    const pi = player.getWaitingFor() as AndOptions;
    pi.options[0].cb([card]);
    pi.options[1].cb([card2, card2]);
    pi.cb();

    // 55 starting MC - 5 for each card select at the start (total: 10)
    expect(player.megaCredits).to.eq(45);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(5);

    player.playedCards.push(card3);
    const action = card3.action(player);
    expect(action).is.not.undefined;
    expect(action instanceof SelectCard).is.true;
    (action as SelectCard<IProjectCard>).cb([(action as SelectCard<IProjectCard>).cards[0]]);
    player.game.deferredActions.runNext();
    expect(player.megaCredits).to.eq(40);
    expect(player.cardsInHand).has.lengthOf(3);
  });


  it('Should draw card', function() {
    const card = new PolyphemosRebalanced();
    const card2 = new EarthCatapult();
    const player = TestPlayers.BLUE.newPlayer();
    const player2 = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, player2], player);
    const action = card.play(player);
    expect(action).is.undefined;
    player.corporationCard = card;
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(5);
    card.onCardPlayed(player, card2);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});
