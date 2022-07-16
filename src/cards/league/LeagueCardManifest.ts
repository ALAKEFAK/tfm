import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {DelayedEntry} from './league_project/DelayedEntry';
import {Incinerator} from './league_project/Incinerator';
import {LaboratoryMouse} from './league_project/LaboratoryMouse';
import {MarsHeavyIndustry} from './league_project/MarsHeavyIndustry';
import {MatingSeason} from './league_project/MatingSeason';
import {RecycledProjects} from './league_project/RecycledProjects';
import {SaunaTicket} from './league_project/SaunaTicket';
import {TargetedTurmoil} from './league_project/TargetedTurmoil';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.DELAYED_ENTRY, Factory: DelayedEntry},
    {cardName: CardName.INCINERATOR, Factory: Incinerator},
    {cardName: CardName.LABORATORY_MOUSE, Factory: LaboratoryMouse},
    {cardName: CardName.MARS_HEAVY_INDUSTRY, Factory: MarsHeavyIndustry},
    {cardName: CardName.MATING_SEASON, Factory: MatingSeason},
    {cardName: CardName.RECYCLED_PROJECTS, Factory: RecycledProjects},
    {cardName: CardName.SAUNA_TICKET, Factory: SaunaTicket},
    {cardName: CardName.TARGETED_TURMOIL, Factory: TargetedTurmoil},
  ],
});
