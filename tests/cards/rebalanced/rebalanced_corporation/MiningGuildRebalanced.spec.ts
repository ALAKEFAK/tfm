import {expect} from 'chai';
import {MiningGuildRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/MiningGuildRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {SpaceBonus} from '../../../../src/SpaceBonus';
import {SpaceType} from '../../../../src/SpaceType';
import {Phase} from '../../../../src/Phase';
import {TestingUtils} from '../../../TestingUtils';
import {TestPlayers} from '../../../TestPlayers';
import {BoardType} from '../../../../src/boards/BoardType';
import {SelectMiningGuildBonus} from '../../../../src/deferredActions/SelectMiningGuildBonus';

describe('MiningGuild', function() {
  let card : MiningGuildRebalanced; let player : Player; let player2 : Player; let game: Game;

  beforeEach(function() {
    card = new MiningGuildRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = Game.newInstance('foobar', [player, player2], player);

    player.corporationCard = card;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.steel).to.eq(2);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
  });

  it('Gives no production bonus when placing tiles in no metal tile placement bonus', function() {
    card.onTilePlaced(player, player, {player, spaceType: SpaceType.LAND, x: 0, y: 0, id: 'foobar', bonus: []}, BoardType.MARS);
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(0);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(0);
  });

  it('Gives metal production bonus when placing a tile on spots with one metal bonus', function() {
    card.onTilePlaced(player, player, {player, spaceType: SpaceType.LAND, x: 0, y: 0, id: 'foobar', bonus: [SpaceBonus.STEEL]}, BoardType.MARS);
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);

    card.onTilePlaced(player, player, {player, spaceType: SpaceType.LAND, x: 0, y: 0, id: 'foobar', bonus: [SpaceBonus.TITANIUM]}, BoardType.MARS);
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });

  it('Gives an option bonus when placing a tile on mixed metal spot', function() {
    card.onTilePlaced(player, player, {player, spaceType: SpaceType.LAND, x: 0, y: 0, id: 'foobar', bonus: [SpaceBonus.STEEL, SpaceBonus.TITANIUM]}, BoardType.MARS);
    expect(game.deferredActions).has.lengthOf(1);
    const action = player.game.deferredActions.pop() as SelectMiningGuildBonus;
    const options = action.execute();
    options.options[0].cb();
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });

  it('Gives steel production bonus when placing ocean tile', function() {
    game.board.getSpaces(SpaceType.OCEAN, player).forEach((space) => {
      if (space.bonus.includes(SpaceBonus.TITANIUM) || space.bonus.includes(SpaceBonus.STEEL)) {
        game.addOceanTile(player, space.id);
      }
    });
    // There are two spaces on the main board that grant titanium or steel.
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
  });

  it('Does not give bonus when other players place tiles', function() {
    card.onTilePlaced(player, player2, {player, spaceType: SpaceType.LAND, x: 0, y: 0, id: 'foobar', bonus: [SpaceBonus.TITANIUM]}, BoardType.MARS);
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(0);
  });

  it('Does not give bonus when other players place ocean tiles', function() {
    TestingUtils.maxOutOceans(player2); // 1 ocean with titanium and 1 with steel
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(0);
  });

  it('Does not give bonus for WGT', function() {
    game.phase = Phase.SOLAR;
    TestingUtils.maxOutOceans(player); // 1 ocean with titanium and 1 with steel
    TestingUtils.runAllActions(game);
    expect(player.getProduction(Resources.STEEL)).to.eq(0);
  });
});
