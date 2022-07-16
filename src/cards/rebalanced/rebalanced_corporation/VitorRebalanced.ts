import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {IProjectCard} from '../../IProjectCard';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {IAward} from '../../../awards/IAward';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';

export class VitorRebalanced extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.VITOR_REBALANCED,
      tags: [Tags.EARTH],
      startingMegaCredits: 52,
      initialActionText: 'Fund an award for free',

      metadata: {
        cardNumber: 'R35',
        description: 'You start with 52 M€. As your first action, fund an award for free.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(52).nbsp.award();
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a card with a NON-NEGATIVE VP icon, including this, gain 2 M€.', (eb) => {
              eb.vpIcon().asterix().startEffect.megacredits(2);
            });
          });
        }),
      },
    });
  }

  private selectAwardToFund(player: Player, award: IAward): SelectOption {
    return new SelectOption('Fund ' + award.name + ' award', 'Confirm', () => {
      player.game.fundAward(player, award);
      return undefined;
    });
  }

  public initialAction(player: Player) {
    const game = player.game;

    // Awards are disabled for 1 player games
    if (game.isSoloMode()) return;

    const freeAward = new OrOptions();
    freeAward.title = 'Select award to fund';
    freeAward.buttonLabel = 'Confirm';

    // If Vitor isn't going first and someone else funds awards, filter them out.
    const availableAwards = game.awards.filter((award) => !game.fundedAwards.map((fa) => fa.award).includes(award));
    freeAward.options = availableAwards.map((award) => this.selectAwardToFund(player, award));

    return freeAward;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.isCorporation(this.name) && card.getVictoryPoints !== undefined && card.getVictoryPoints(player) >= 0) {
      player.megaCredits += 2;
    }
  }

  public play(_player: Player) {
    return undefined;
  }
}
