import {Card} from '../../Card';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {CorporationCard} from '../../corporation/CorporationCard';
import {TileType} from '../../../TileType';
import {ISpace} from '../../../boards/ISpace';
import {SelectSpace} from '../../../inputs/SelectSpace';
// import {Resources} from '../../../Resources';
// import {SelectScavengersStartingProd} from '../../../deferredActions/SelectScavengersStartingProd';

export class Scavengers extends Card implements CorporationCard {
  // burner
  // SCAVENGERS TilePlacement hook in Game.grantSpaceBonus()
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.SCAVENGERS,
      startingMegaCredits: 46,
      initialActionText: 'Place the crashed space ship tile on mars',

      metadata: {
        cardNumber: 'L421',
        // description: 'You start with 46 M€ and 1 of every other resource. Choose 2 different production types. As your first action, place the crashed space ship tile on mars.',
        description: 'You start with 46 M€ and 1 of every other resource. As your first action, place the crashed space ship tile on mars.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(46).wild(1).tile(TileType.SCAVENGERS, true);
          // b.megacredits(46).production((pb) => pb.megacredits(-3).wild(2)).wild(1).tile(TileType.SCAVENGERS, true);
          b.corpBox('effect', (ce) => {
            ce.effect('When you place a tile on mars, gain an additional bonus of each type printed on the tile.', (eb) => {
              eb.text('n').wild(1).startEffect.text('(n+1)').wild(1);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: Player) {
    const availableSpaces = player.game.board.getAvailableSpacesOnLand(player);
    return new SelectSpace('Select space for tile', availableSpaces, (foundSpace: ISpace) => {
      player.game.addTile(player, foundSpace.spaceType, foundSpace, {tileType: TileType.SCAVENGERS});
      return undefined;
    });
  }

  public play(player: Player) {
    // player.addProduction(Resources.MEGACREDITS, -3);
    player.steel++;
    player.titanium++;
    player.plants++;
    player.energy++;
    player.heat++;
    // player.game.defer(new SelectScavengersStartingProd(player));
    return undefined;
  }
}
