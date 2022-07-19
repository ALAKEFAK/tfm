import {IProjectCard} from '../../IProjectCard';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Tags} from '../../Tags';
import {CardRequirements} from '../../CardRequirements';

export class RecycledProjects extends Card implements IProjectCard {
  // author: ThreadPacifist
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.RECYCLED_PROJECTS,
      cost: 19,
      tags: [Tags.SCIENCE, Tags.BUILDING, Tags.SPACE],

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 4)),
      metadata: {
        cardNumber: 'L304',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (eb) => {
            eb.building(1).played.startEffect.steel(1);
          }).br;
          b.effect(undefined, (eb) => {
            eb.space().played.startEffect.titanium(1);
          }).br;
        }),
        description: 'After playing a building or space tag, including these, receive a steel or titanium resource respectively.',
        victoryPoints: 1,
      },
    });
  }

  public play() {
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard): void {
    const numBuildingTags = card.tags.filter((tag) => tag === Tags.BUILDING).length;
    const numSpaceTags = card.tags.filter((tag) => tag === Tags.SPACE).length;
    if (numBuildingTags > 0) player.steel += numBuildingTags;
    if (numSpaceTags > 0) player.titanium += numSpaceTags;
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
