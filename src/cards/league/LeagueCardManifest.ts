import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {AmphibianFarming} from './league_project/AmphibianFarming';
import {AssemblyLines} from './league_project/AssemblyLines';
import {BankUnions} from './league_project/BankUnions';
import {DactylAndIda} from './league_project/DactylAndIda';
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
// import {PhobosFalls} from './league_project/PhobosFalls';
// import {PhobosSpaceHavenLeague} from './league_project/PhobosSpaceHavenLeague';
import {RecycledProjects} from './league_project/RecycledProjects';
import {SteelCasting} from './league_project/SteelCasting';
import {SulfuricImport} from './league_project/SulfuricImport';
import {TargetedTurmoil} from './league_project/TargetedTurmoil';
import {TitaniumIsotopes} from './league_project/TitaniumIsotopes';
import {WorldGovernmentPartnership} from './league_project/WorldGovernmentPartnership';

export const LEAGUE_CARD_MANIFEST = new CardManifest({
  module: GameModule.League,
  projectCards: [
    {cardName: CardName.AMPHIBIAN_FARMING, Factory: AmphibianFarming},
    {cardName: CardName.ASSEMBLY_LINES, Factory: AssemblyLines},
    {cardName: CardName.BANK_UNIONS, Factory: BankUnions},
    {cardName: CardName.DACTYL_AND_IDA, Factory: DactylAndIda},
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
    // {cardName: CardName.PHOBOS_FALLS, Factory: PhobosFalls},
    // {cardName: CardName.PHOBOS_SPACE_HAVEN_LEAGUE, Factory: PhobosSpaceHavenLeague},
    {cardName: CardName.RECYCLED_PROJECTS, Factory: RecycledProjects},
    {cardName: CardName.STEEL_CASTING, Factory: SteelCasting},
    {cardName: CardName.SULFURIC_IMPORT, Factory: SulfuricImport},
    {cardName: CardName.TARGETED_TURMOIL, Factory: TargetedTurmoil, compatibility: GameModule.Turmoil},
    {cardName: CardName.TITANIUM_ISOTOPES, Factory: TitaniumIsotopes},
    {cardName: CardName.WORLD_GOVERNMENT_PARTNERSHIP, Factory: WorldGovernmentPartnership},
  ],
  preludeCards: [
    {cardName: CardName.FIRST_CONTACT, Factory: FirstContact, compatibility: GameModule.Colonies},
    {cardName: CardName.MAN_OF_THE_PEOPLE, Factory: ManOfThePeople, compatibility: GameModule.Turmoil},
  ],
  // cardsToRemove: [
  //   // projects
  //   CardName.PHOBOS_SPACE_HAVEN,
  // ],
});
