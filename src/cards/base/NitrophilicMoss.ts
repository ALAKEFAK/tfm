import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class NitrophilicMoss extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.NITROPHILIC_MOSS,
      tags: [Tags.PLANT],
      cost: 8,

      requirements: CardRequirements.builder((b) => b.oceans(3)),
      metadata: {
        cardNumber: '146',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plants(2);
          }).nbsp.minus().plants(2);
        }),
        description: 'Requires 3 ocean tiles and that you lose 2 plants. Increase your plant production 2 steps.',
      },
    });
  }

  public canPlay(player: Player): boolean {
    const meetsCardRequirements = super.canPlay(player);
    const hasViralEnhancers = player.playedCards.find((card) => card.name === CardName.VIRAL_ENHANCERS);
    let plantEquivalent = player.plants;
    if (hasViralEnhancers !== undefined) {
      plantEquivalent += 1;
    }
    if (player.isCorporation(CardName.MANUTECH)) {
      plantEquivalent += 2;
    }
    if (player.isCorporation(CardName.ECOLINE)) {
      plantEquivalent += 1;
    }
    const hasEnoughPlants = plantEquivalent >= 2;

    return meetsCardRequirements && hasEnoughPlants;
  }
  public play(player: Player) {
    player.plants -= 2;
    player.addProduction(Resources.PLANTS, 2);
    return undefined;
  }
}
