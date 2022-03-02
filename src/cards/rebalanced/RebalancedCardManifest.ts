import {CardName} from '../../CardName';
import {GameModule} from '../../GameModule';
import {CardManifest} from '../CardManifest';
import {AphroditeRebalanced} from './rebalanced_corporation/AphroditeRebalanced';
import {ArcadianCommunitiesRebalanced} from './rebalanced_corporation/ArcadianCommunitiesRebalanced';
import {AridorRebalanced} from './rebalanced_corporation/AridorRebalanced';
import {ArklightRebalanced} from './rebalanced_corporation/ArklightRebalanced';
import {AstrodrillRebalanced} from './rebalanced_corporation/AstrodrillRebalanced';
import {CelesticRebalanced} from './rebalanced_corporation/CelesticRebalanced';
import {CheungShingMARSRebalanced} from './rebalanced_corporation/CheungShingMARSRebalanced';
import {EcoLineRebalanced} from './rebalanced_corporation/EcoLineRebalanced';
import {FactorumRebalanced} from './rebalanced_corporation/FactorumRebalanced';
import {HelionRebalanced} from './rebalanced_corporation/HelionRebalanced';
import {InterplanetaryCinematicsRebalanced} from './rebalanced_corporation/InterplanetaryCinematicsRebalanced';
import {InventrixRebalanced} from './rebalanced_corporation/InventrixRebalanced';
import {MiningGuildRebalanced} from './rebalanced_corporation/MiningGuildRebalanced';
import {MonsInsuranceRebalanced} from './rebalanced_corporation/MonsInsuranceRebalanced';
import {MorningStarIncRebalanced} from './rebalanced_corporation/MorningStarIncRebalanced';
import {PhoboLogRebalanced} from './rebalanced_corporation/PhoboLogRebalanced';
import {PointLunaRebalanced} from './rebalanced_corporation/PointLunaRebalanced';
import {PolyphemosRebalanced} from './rebalanced_corporation/PolyphemosRebalanced';
import {PoseidonRebalanced} from './rebalanced_corporation/PoseidonRebalanced';
import {PristarRebalanced} from './rebalanced_corporation/PristarRebalanced';
import {RecyclonRebalanced} from './rebalanced_corporation/RecyclonRebalanced';
import {RobinsonIndustriesRebalanced} from './rebalanced_corporation/RobinsonIndustriesRebalanced';
import {SpliceRebalanced} from './rebalanced_corporation/SpliceRebalanced';
import {StormCraftIncorporatedRebalanced} from './rebalanced_corporation/StormCraftIncorporatedRebalanced';
import {TerralabsResearchRebalanced} from './rebalanced_corporation/TerralabsResearchRebalanced';
import {TharsisRepublicRebalanced} from './rebalanced_corporation/TharsisRepublicRebalanced';
import {ThorgateRebalanced} from './rebalanced_corporation/ThorgateRebalanced';
import {UnitedNationsMarsInitiativeRebalanced} from './rebalanced_corporation/UnitedNationsMarsInitiativeRebalanced';
import {BiofuelsRebalanced} from './rebalanced_prelude/BiofuelsRebalanced';
import {BiosphereSupportRebalanced} from './rebalanced_prelude/BiosphereSupportRebalanced';
import {DomeFarmingRebalanced} from './rebalanced_prelude/DomeFarmingRebalanced';
import {EarlySettlementRebalanced} from './rebalanced_prelude/EarlySettlementRebalanced';
import {HugeAsteroidRebalanced} from './rebalanced_prelude/HugeAsteroidRebalanced';
import {MoholeExcavationRebalanced} from './rebalanced_prelude/MoholeExcavationRebalanced';
import {MoholeRebalanced} from './rebalanced_prelude/MoholeRebalanced';
import {NitrogenDeliveryRebalanced} from './rebalanced_prelude/NitrogenDeliveryRebalanced';
import {PolarIndustriesRebalanced} from './rebalanced_prelude/PolarIndustriesRebalanced';
import {SelfSufficientSettlementRebalanced} from './rebalanced_prelude/SelfSufficientSettlementRebalanced';
import {SmeltingPlantRebalanced} from './rebalanced_prelude/SmeltingPlantRebalanced';
import {SocietySupportRebalanced} from './rebalanced_prelude/SocietySupportRebalanced';
import {AerobrakedAmmoniaAsteroidRebalanced} from './rebalanced_project/AerobrakedAmmoniaAsteroidRebalanced';
import {BactoviralResearchRebalanced} from './rebalanced_project/BactoviralResearchRebalanced';
import {EarthCatapultRebalanced} from './rebalanced_project/EarthCatapultRebalanced';
import {MarsUniversityRebalanced} from './rebalanced_project/MarsUniversityRebalanced';
import {TollStationRebalanced} from './rebalanced_project/TollStationRebalanced';
import {UndergroundDetonationsRebalanced} from './rebalanced_project/UndergroundDetonationsRebalanced';
import {BuildColonyStandardProjectRebalanced} from './rebalanced_standardproject/BuildColonyStandardProjectRebalanced';
import {VironRebalanced} from './rebalanced_corporation/VironRebalanced';
import {VitorRebalanced} from './rebalanced_corporation/VitorRebalanced';
import {UtopiaInvestRebalanced} from './rebalanced_corporation/UtopiaInvestRebalanced';
import {MetalsCompanyRebalanced} from './rebalanced_prelude/MetalsCompanyRebalanced';
import {SupplyDropRebalanced} from './rebalanced_prelude/SupplyDropRebalanced';
import {LoanRebalanced} from './rebalanced_prelude/LoanRebalanced';
import {DonationRebalanced} from './rebalanced_prelude/DonationRebalanced';
import {ExtractorBalloonsRebalanced} from './rebalanced_project/ExtractorBalloonsRebalanced';
import {ForcedPrecipitationRebalanced} from './rebalanced_project/ForcedPrecipitationRebalanced';
import {GHGImportFromVenusRebalanced} from './rebalanced_project/GHGImportFromVenusRebalanced';
import {OrbitalCleanupRebalanced} from './rebalanced_project/OrbitalCleanupRebalanced';
import {StratopolisRebalanced} from './rebalanced_project/StratopolisRebalanced';
import {GMOContractRebalanced} from './rebalanced_project/GMOContractRebalanced';
import {SpinoffDepartmentRebalanced} from './rebalanced_project/SpinoffDepartmentRebalanced';

export const REBALANCED_CARD_MANIFEST = new CardManifest({
  module: GameModule.Rebalanced,
  projectCards: [
    {cardName: CardName.TOLL_STATION_REBALANCED, Factory: TollStationRebalanced},
    {cardName: CardName.UNDERGROUND_DETONATIONS_REBALANCED, Factory: UndergroundDetonationsRebalanced},
    {cardName: CardName.EARTH_CATAPULT_REBALANCED, Factory: EarthCatapultRebalanced},
    {cardName: CardName.MARS_UNIVERSITY_REBALANCED, Factory: MarsUniversityRebalanced},
    {cardName: CardName.BACTOVIRAL_RESEARCH_REBALANCED, Factory: BactoviralResearchRebalanced},
    {cardName: CardName.AEROBRAKED_AMMONIA_ASTEROID_REBALANCED, Factory: AerobrakedAmmoniaAsteroidRebalanced},
    {cardName: CardName.EXTRACTOR_BALLOONS_REBALANCED, Factory: ExtractorBalloonsRebalanced},
    {cardName: CardName.FORCED_PRECIPITATION_REBALANCED, Factory: ForcedPrecipitationRebalanced},
    {cardName: CardName.GHG_IMPORT_FROM_VENUS_REBALANCED, Factory: GHGImportFromVenusRebalanced},
    {cardName: CardName.ORBITAL_CLEANUP_REBALANCED, Factory: OrbitalCleanupRebalanced},
    {cardName: CardName.STRATOPOLIS_REBALANCED, Factory: StratopolisRebalanced},
    {cardName: CardName.GMO_CONTRACT_REBALANCED, Factory: GMOContractRebalanced},
    {cardName: CardName.SPINOFF_DEPARTMENT_REBALANCED, Factory: SpinoffDepartmentRebalanced},
  ],
  corporationCards: [
    {cardName: CardName.APHRODITE_REBALANCED, Factory: AphroditeRebalanced, compatibility: GameModule.Venus},
    {cardName: CardName.ARCADIAN_COMMUNITIES_REBALANCED, Factory: ArcadianCommunitiesRebalanced},
    {cardName: CardName.ARIDOR_REBALANCED, Factory: AridorRebalanced, compatibility: GameModule.Colonies},
    {cardName: CardName.ASTRODRILL_REBALANCED, Factory: AstrodrillRebalanced},
    {cardName: CardName.ARKLIGHT_REBALANCED, Factory: ArklightRebalanced},
    {cardName: CardName.CHEUNG_SHING_MARS_REBALANCED, Factory: CheungShingMARSRebalanced},
    {cardName: CardName.CELESTIC_REBALANCED, Factory: CelesticRebalanced, compatibility: GameModule.Venus},
    {cardName: CardName.ECOLINE_REBALANCED, Factory: EcoLineRebalanced},
    {cardName: CardName.FACTORUM_REBALANCED, Factory: FactorumRebalanced},
    {cardName: CardName.HELION_REBALANCED, Factory: HelionRebalanced},
    {cardName: CardName.INTERPLANETARY_CINEMATICS_REBALANCED, Factory: InterplanetaryCinematicsRebalanced},
    {cardName: CardName.INVENTRIX_REBALANCED, Factory: InventrixRebalanced},
    {cardName: CardName.MINING_GUILD_REBALANCED, Factory: MiningGuildRebalanced},
    {cardName: CardName.MONS_INSURANCE_REBALANCED, Factory: MonsInsuranceRebalanced},
    {cardName: CardName.MORNING_STAR_INC_REBALANCED, Factory: MorningStarIncRebalanced, compatibility: GameModule.Venus},
    {cardName: CardName.PHOBOLOG_REBALANCED, Factory: PhoboLogRebalanced},
    {cardName: CardName.POINT_LUNA_REBALANCED, Factory: PointLunaRebalanced},
    {cardName: CardName.POLYPHEMOS_REBALANCED, Factory: PolyphemosRebalanced},
    {cardName: CardName.POSEIDON_REBALANCED, Factory: PoseidonRebalanced, compatibility: GameModule.Colonies},
    {cardName: CardName.PRISTAR_REBALANCED, Factory: PristarRebalanced},
    {cardName: CardName.RECYCLON_REBALANCED, Factory: RecyclonRebalanced},
    {cardName: CardName.ROBINSON_INDUSTRIES_REBALANCED, Factory: RobinsonIndustriesRebalanced},
    {cardName: CardName.SPLICE_REBALANCED, Factory: SpliceRebalanced},
    {cardName: CardName.STORMCRAFT_INCORPORATED_REBALANCED, Factory: StormCraftIncorporatedRebalanced},
    {cardName: CardName.TERRALABS_RESEARCH_REBALANCED, Factory: TerralabsResearchRebalanced},
    {cardName: CardName.THARSIS_REPUBLIC_REBALANCED, Factory: TharsisRepublicRebalanced},
    {cardName: CardName.THORGATE_REBALANCED, Factory: ThorgateRebalanced},
    {cardName: CardName.UNITED_NATIONS_MARS_INITIATIVE_REBALANCED, Factory: UnitedNationsMarsInitiativeRebalanced},
    {cardName: CardName.VIRON_REBALANCED, Factory: VironRebalanced},
    {cardName: CardName.VITOR_REBALANCED, Factory: VitorRebalanced},
    {cardName: CardName.UTOPIA_INVEST_REBALANCED, Factory: UtopiaInvestRebalanced},
  ],
  preludeCards: [
    {cardName: CardName.SOCIETY_SUPPORT_REBALANCED, Factory: SocietySupportRebalanced},
    {cardName: CardName.BIOFUELS_REBALANCED, Factory: BiofuelsRebalanced},
    {cardName: CardName.BIOSPHERE_SUPPORT_REBALANCED, Factory: BiosphereSupportRebalanced},
    {cardName: CardName.DOME_FARMING_REBALANCED, Factory: DomeFarmingRebalanced},
    {cardName: CardName.EARLY_SETTLEMENT_REBALANCED, Factory: EarlySettlementRebalanced},
    {cardName: CardName.HUGE_ASTEROID_REBALANCED, Factory: HugeAsteroidRebalanced},
    {cardName: CardName.MOHOLE_EXCAVATION_REBALANCED, Factory: MoholeExcavationRebalanced},
    {cardName: CardName.MOHOLE_REBALANCED, Factory: MoholeRebalanced},
    {cardName: CardName.NITROGEN_SHIPMENT_REBALANCED, Factory: NitrogenDeliveryRebalanced},
    {cardName: CardName.SELF_SUFFICIENT_SETTLEMENT_REBALANCED, Factory: SelfSufficientSettlementRebalanced},
    {cardName: CardName.SMELTING_PLANT_REBALANCED, Factory: SmeltingPlantRebalanced},
    {cardName: CardName.POLAR_INDUSTRIES_REBALANCED, Factory: PolarIndustriesRebalanced},
    {cardName: CardName.METALS_COMPANY_REBALANCED, Factory: MetalsCompanyRebalanced},
    {cardName: CardName.SUPPLY_DROP_REBALANCED, Factory: SupplyDropRebalanced},
    {cardName: CardName.LOAN_REBALANCED, Factory: LoanRebalanced},
    {cardName: CardName.DONATION_REBALANCED, Factory: DonationRebalanced},
  ],
  standardProjects: [
    {cardName: CardName.BUILD_COLONY_STANDARD_PROJECT_REBALANCED, Factory: BuildColonyStandardProjectRebalanced, compatibility: GameModule.Colonies},
  ],
  cardsToRemove: [
    // projects
    CardName.TOLL_STATION,
    CardName.UNDERGROUND_DETONATIONS,
    CardName.EARTH_CATAPULT,
    CardName.MARS_UNIVERSITY,
    CardName.BACTOVIRAL_RESEARCH,
    CardName.AEROBRAKED_AMMONIA_ASTEROID,
    CardName.EXTRACTOR_BALLOONS,
    CardName.FORCED_PRECIPITATION,
    CardName.GHG_IMPORT_FROM_VENUS,
    CardName.ORBITAL_CLEANUP,
    CardName.STRATOPOLIS,
    CardName.GMO_CONTRACT,
    CardName.SPINOFF_DEPARTMENT,
    // corporations
    CardName.ECOLINE,
    CardName.UNITED_NATIONS_MARS_INITIATIVE,
    CardName.TERRALABS_RESEARCH,
    CardName.HELION,
    CardName.INTERPLANETARY_CINEMATICS,
    CardName.INVENTRIX,
    CardName.MINING_GUILD,
    CardName.THORGATE,
    CardName.PHOBOLOG,
    CardName.ARKLIGHT,
    CardName.APHRODITE,
    CardName.POSEIDON,
    CardName.ARCADIAN_COMMUNITIES,
    CardName.CELESTIC,
    CardName.MORNING_STAR_INC,
    CardName.POINT_LUNA,
    CardName.POLYPHEMOS,
    CardName.RECYCLON,
    CardName.ROBINSON_INDUSTRIES,
    CardName.SPLICE,
    CardName.STORMCRAFT_INCORPORATED,
    CardName.FACTORUM,
    CardName.ASTRODRILL,
    CardName.PRISTAR,
    CardName.MONS_INSURANCE,
    CardName.ARIDOR,
    CardName.THARSIS_REPUBLIC,
    CardName.CHEUNG_SHING_MARS,
    CardName.VIRON,
    CardName.VITOR,
    CardName.UTOPIA_INVEST,
    // preludes
    CardName.SOCIETY_SUPPORT,
    CardName.BIOFUELS,
    CardName.BIOSPHERE_SUPPORT,
    CardName.DOME_FARMING,
    CardName.EARLY_SETTLEMENT,
    CardName.MOHOLE_EXCAVATION,
    CardName.MOHOLE,
    CardName.HUGE_ASTEROID,
    CardName.NITROGEN_SHIPMENT,
    CardName.SELF_SUFFICIENT_SETTLEMENT,
    CardName.SMELTING_PLANT,
    CardName.POLAR_INDUSTRIES,
    CardName.METALS_COMPANY,
    CardName.SUPPLY_DROP,
    CardName.LOAN,
    CardName.DONATION,
    // standard project
    CardName.BUILD_COLONY_STANDARD_PROJECT,
  ],
});
