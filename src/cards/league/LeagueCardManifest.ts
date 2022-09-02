import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {AmphibianFarming} from './league_project/AmphibianFarming';
import {AssemblyLines} from './league_project/AssemblyLines';
import {BankUnions} from './league_project/BankUnions';
import {DelayedEntry} from './league_project/DelayedEntry';
import {EdibleFungi} from './league_project/EdibleFungi';
import {FireSale} from './league_project/FireSale';
import {FirstContact} from './league_preludes/FirstContact';
import {HeavyMetalBioremediation} from './league_project/HeavyMetalBioremediation';
import {Incinerator} from './league_project/Incinerator';
import {InvestmentBanks} from './league_project/InvestmentBanks';
import {LaboratoryMice} from './league_project/LaboratoryMice';
import {ManOfThePeople} from './league_preludes/ManOfThePeople';
import {MarsHeavyIndustry} from './league_project/MarsHeavyIndustry';
import {MatingSeason} from './league_project/MatingSeason';
import {NoMonNoCryInsurance} from './league_project/NoMonNoCryInsurance';
import {RecycledProjects} from './league_project/RecycledProjects';
import {SteelCasting} from './league_project/SteelCasting';
import {TargetedTurmoil} from './league_project/TargetedTurmoil';
import {TitaniumIsotopes} from './league_project/TitaniumIsotopes';
import {AnonymousEventOne} from './league_project/AnonymousEventOne';
import {AnonymousEventTwo} from './league_project/AnonymousEventTwo';
import {AnonymousEventThree} from './league_project/AnonymousEventThree';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.AMPHIBIAN_FARMING, Factory: AmphibianFarming},
    {cardName: CardName.ANONYMOUS_EVENT_ONE, Factory: AnonymousEventOne},
    {cardName: CardName.ANONYMOUS_EVENT_TWO, Factory: AnonymousEventTwo},
    {cardName: CardName.ANONYMOUS_EVENT_THREE, Factory: AnonymousEventThree},
    {cardName: CardName.ASSEMBLY_LINES, Factory: AssemblyLines},
    {cardName: CardName.BANK_UNIONS, Factory: BankUnions},
    {cardName: CardName.DELAYED_ENTRY, Factory: DelayedEntry},
    {cardName: CardName.EDIBLE_FUNGI, Factory: EdibleFungi},
    {cardName: CardName.FIRE_SALE, Factory: FireSale},
    {cardName: CardName.HEAVY_METAL_BIOREMEDIATION, Factory: HeavyMetalBioremediation},
    {cardName: CardName.INCINERATOR, Factory: Incinerator},
    {cardName: CardName.INVESTMENT_BANKS, Factory: InvestmentBanks},
    {cardName: CardName.LABORATORY_MICE, Factory: LaboratoryMice},
    {cardName: CardName.MARS_HEAVY_INDUSTRY, Factory: MarsHeavyIndustry},
    {cardName: CardName.MATING_SEASON, Factory: MatingSeason},
    {cardName: CardName.NOMON_NOCRY_INSURANCE, Factory: NoMonNoCryInsurance},
    {cardName: CardName.RECYCLED_PROJECTS, Factory: RecycledProjects},
    {cardName: CardName.STEEL_CASTING, Factory: SteelCasting},
    {cardName: CardName.TARGETED_TURMOIL, Factory: TargetedTurmoil, compatibility: GameModule.Turmoil},
    {cardName: CardName.TITANIUM_ISOTOPES, Factory: TitaniumIsotopes},
  ],
  preludeCards: [
    {cardName: CardName.FIRST_CONTACT, Factory: FirstContact, compatibility: GameModule.Colonies},
    {cardName: CardName.MAN_OF_THE_PEOPLE, Factory: ManOfThePeople, compatibility: GameModule.Turmoil},
  ],
});
