import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {SaunaTicket} from './league_project/SaunaTicket';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.SAUNA_TICKET, Factory: SaunaTicket},
  ],
});
