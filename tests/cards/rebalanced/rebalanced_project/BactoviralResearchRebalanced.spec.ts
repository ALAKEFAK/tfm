import {expect} from 'chai';
import {RegolithEaters} from '../../../../src/cards/base/RegolithEaters';
import {Research} from '../../../../src/cards/base/Research';
import {Tardigrades} from '../../../../src/cards/base/Tardigrades';
import {ICard} from '../../../../src/cards/ICard';
import {BactoviralResearchRebalanced} from '../../../../src/cards/rebalanced/rebalanced_project/BactoviralResearchRebalanced';
import {Game} from '../../../../src/Game';
import {SelectCard} from '../../../../src/inputs/SelectCard';
import {Player} from '../../../../src/Player';
import {TestPlayers} from '../../../TestPlayers';

describe('BactoviralResearchRebalanced', function() {
  let card : BactoviralResearchRebalanced; let player : Player;

  beforeEach(function() {
    card = new BactoviralResearchRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
  });

  it('Should play with multiple microbe cards', function() {
    const card2 = new Research();
    const card3 = new RegolithEaters();
    const card4 = new Tardigrades();
    player.playedCards.push(card2, card3, card4);

    const action = card.play(player) as SelectCard<ICard>;
    expect(action instanceof SelectCard).is.true;
    action.cb([card3]);
    expect(player.getResourcesOnCard(card3)).to.eq(3);
    expect(player.cardsInHand.length).to.eq(1);
  });

  it('Should play with single microbe card', function() {
    const card2 = new RegolithEaters();
    player.playedCards.push(card2);
    card.play(player) as SelectCard<ICard>;
    expect(player.getResourcesOnCard(card2)).to.eq(2);
    expect(player.cardsInHand.length).to.eq(1);
  });

  it('Should play with no microbe cards', function() {
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.cardsInHand.length).to.eq(1);
  });
});
