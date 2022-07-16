import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {SaunaTicket} from './league_project/SaunaTicket';
import {MarsHeavyIndustry} from './league_project/MarsHeavyIndustry';
import {Incinerator} from './league_project/Incinerator';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.INCINERATOR, Factory: Incinerator},
    {cardName: CardName.MARS_HEAVY_INDUSTRY, Factory: MarsHeavyIndustry},
    {cardName: CardName.SAUNA_TICKET, Factory: SaunaTicket},
  ],
});
