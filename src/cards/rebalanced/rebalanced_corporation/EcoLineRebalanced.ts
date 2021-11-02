import {Card} from '../../Card';
import {CorporationCard} from './../../corporation/CorporationCard';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {IProjectCard} from '../../IProjectCard';
import {DeferredAction} from '../../../deferredActions/DeferredAction';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';

export class EcoLineRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ECOLINE_REBALANCED,
      tags: [Tags.PLANT],
      startingMegaCredits: 37,

      metadata: {
        cardNumber: 'R17',
        description: 'You start with 3 plant production, and 37 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(3)).nbsp.megacredits(37);
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play a plant, animal or microbe tag, including this, gain 2MC or 1 plant.', (eb) => {
              eb.animals(1).played.slash().plants(1).played.slash().microbes(1).played;
              eb.startEffect.megacredits(2).or().plants(1);
            });
          });
        }),
      },
    });
  }

  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 3);
    this.gainBonus(player, 1);
    return undefined;
  }

  private gainBonus(player: Player, amount: number): void {
    for (let i = 0; i < amount; i++) {
      if (player.plants < 0) {
        player.plants += 1;
      } else {
        player.game.defer(
          new DeferredAction(player, () => {
            return new OrOptions(
              new SelectOption('Gain 2 MC', 'Gain MC', () => {
                player.addResource(Resources.MEGACREDITS, 2, {log: true});
                return undefined;
              }),
              new SelectOption('Gain 1 plant', 'Gain plant', () => {
                player.addResource(Resources.PLANTS, 1, {log: true});
                return undefined;
              }));
          }),
        );
      }
    }
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    if (player.corporationCard !== undefined && player.corporationCard.name === this.name) {
      const amount = card.tags.filter((tag) => tag === Tags.ANIMAL || tag === Tags.PLANT || tag === Tags.MICROBE).length;
      if (amount > 0) {
        this.gainBonus(player, amount);
      }
    }
  }
}
