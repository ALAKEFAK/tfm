import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {SaunaTicket} from './league_project/SaunaTicket';
import {MarsHeavyIndustry} from './league_project/MarsHeavyIndustry';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.SAUNA_TICKET, Factory: SaunaTicket},
    {cardName: CardName.MARS_HEAVY_INDUSTRY, Factory: MarsHeavyIndustry},
  ],
});
