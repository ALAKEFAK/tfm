import {Card} from '../../Card';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {IProjectCard} from '../../IProjectCard';
import {CorporationCard} from '../../corporation/CorporationCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Size} from '../../render/Size';

export class ThorgateRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.THORGATE_REBALANCED,
      tags: [Tags.SCIENCE, Tags.ENERGY],
      startingMegaCredits: 40,

      cardDiscount: {tag: Tags.ENERGY, amount: 3},
      metadata: {
        cardNumber: 'R13',
        description: 'You start with 1 energy production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1)).nbsp.megacredits(40);
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Decr. energy prod. gain 8 M€.', (eb) => {
              eb.production((pb) => pb.energy(1)).startAction.megacredits(8);
            });
            ce.vSpace(Size.SMALL);
            ce.effect('When playing a power card OR SP POWER OR TURMOIL KELVINISTS ACTION, you pay 3 M€ less for it.', (eb) => {
              // TODO(chosta): energy().played needs to be power() [same for space()]
              eb.energy(1).played.asterix().slash().production((pb) => {
                pb.energy(1).heat(1);
              }).asterix().startEffect.megacredits(-3);
            });
          });
        }),
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    if (card.tags.includes(Tags.ENERGY)) {
      return 3;
    }
    return 0;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.getProduction(Resources.ENERGY) >= 1;
  }

  public action(player: Player) {
    if (player.getProduction(Resources.ENERGY) >= 1) {
      return this.getMegacreditsOption(player);
    }
    return undefined;
  }

  private getMegacreditsOption(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.addResource(Resources.MEGACREDITS, 8);
    player.game.log('${0} decreased energy production 1 step to gain 8 M€', (b) => b.player(player));
    return undefined;
  }
}

