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
import {EccentricSponsorRebalanced} from './rebalanced_prelude/EccentricSponsorRebalanced';
import {GalileanMiningRebalanced} from './rebalanced_prelude/GalileanMiningRebalanced';
import {IoResearchOutpostRebalanced} from './rebalanced_prelude/IoResearchOutpostRebalanced';
import {AsteroidHollowingRebalanced} from './rebalanced_project/AsteroidHollowingRebalanced';
import {JetStreamMicroscrappersRebalanced} from './rebalanced_project/JetStreamMicroscrappersRebalanced';

export const REBALANCED_CARD_MANIFEST = new CardManifest({
  module: GameModule.Rebalanced,
  projectCards: [
    {cardName: CardName.AEROBRAKED_AMMONIA_ASTEROID_REBALANCED, Factory: AerobrakedAmmoniaAsteroidRebalanced},
    {cardName: CardName.ASTEROID_HOLLOWING_REBALANCED, Factory: AsteroidHollowingRebalanced},
    {cardName: CardName.BACTOVIRAL_RESEARCH_REBALANCED, Factory: BactoviralResearchRebalanced},
    {cardName: CardName.EARTH_CATAPULT_REBALANCED, Factory: EarthCatapultRebalanced},
    {cardName: CardName.EXTRACTOR_BALLOONS_REBALANCED, Factory: ExtractorBalloonsRebalanced},
    {cardName: CardName.FORCED_PRECIPITATION_REBALANCED, Factory: ForcedPrecipitationRebalanced},
    {cardName: CardName.GHG_IMPORT_FROM_VENUS_REBALANCED, Factory: GHGImportFromVenusRebalanced},
    {cardName: CardName.GMO_CONTRACT_REBALANCED, Factory: GMOContractRebalanced},
    {cardName: CardName.JET_STREAM_MICROSCRAPPERS_REBALANCED, Factory: JetStreamMicroscrappersRebalanced},
    {cardName: CardName.MARS_UNIVERSITY_REBALANCED, Factory: MarsUniversityRebalanced},
    {cardName: CardName.ORBITAL_CLEANUP_REBALANCED, Factory: OrbitalCleanupRebalanced},
    {cardName: CardName.SPINOFF_DEPARTMENT_REBALANCED, Factory: SpinoffDepartmentRebalanced},
    {cardName: CardName.STRATOPOLIS_REBALANCED, Factory: StratopolisRebalanced},
    {cardName: CardName.TOLL_STATION_REBALANCED, Factory: TollStationRebalanced},
    {cardName: CardName.UNDERGROUND_DETONATIONS_REBALANCED, Factory: UndergroundDetonationsRebalanced},
  ],
  corporationCards: [
    {cardName: CardName.APHRODITE_REBALANCED, Factory: AphroditeRebalanced, compatibility: GameModule.Venus},
    {cardName: CardName.ARCADIAN_COMMUNITIES_REBALANCED, Factory: ArcadianCommunitiesRebalanced},
    {cardName: CardName.ARIDOR_REBALANCED, Factory: AridorRebalanced, compatibility: GameModule.Colonies},
    {cardName: CardName.ARKLIGHT_REBALANCED, Factory: ArklightRebalanced},
    {cardName: CardName.ASTRODRILL_REBALANCED, Factory: AstrodrillRebalanced},
    {cardName: CardName.CELESTIC_REBALANCED, Factory: CelesticRebalanced, compatibility: GameModule.Venus},
    {cardName: CardName.CHEUNG_SHING_MARS_REBALANCED, Factory: CheungShingMARSRebalanced},
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
    {cardName: CardName.UTOPIA_INVEST_REBALANCED, Factory: UtopiaInvestRebalanced},
    {cardName: CardName.VIRON_REBALANCED, Factory: VironRebalanced},
    {cardName: CardName.VITOR_REBALANCED, Factory: VitorRebalanced},
  ],
  preludeCards: [
    {cardName: CardName.BIOFUELS_REBALANCED, Factory: BiofuelsRebalanced},
    {cardName: CardName.BIOSPHERE_SUPPORT_REBALANCED, Factory: BiosphereSupportRebalanced},
    {cardName: CardName.DOME_FARMING_REBALANCED, Factory: DomeFarmingRebalanced},
    {cardName: CardName.DONATION_REBALANCED, Factory: DonationRebalanced},
    {cardName: CardName.EARLY_SETTLEMENT_REBALANCED, Factory: EarlySettlementRebalanced},
    {cardName: CardName.ECCENTRIC_SPONSOR_REBALANCED, Factory: EccentricSponsorRebalanced},
    {cardName: CardName.GALILEAN_MINING_REBALANCED, Factory: GalileanMiningRebalanced},
    {cardName: CardName.HUGE_ASTEROID_REBALANCED, Factory: HugeAsteroidRebalanced},
    {cardName: CardName.IO_RESEARCH_OUTPOST_REBALANCED, Factory: IoResearchOutpostRebalanced},
    {cardName: CardName.LOAN_REBALANCED, Factory: LoanRebalanced},
    {cardName: CardName.METALS_COMPANY_REBALANCED, Factory: MetalsCompanyRebalanced},
    {cardName: CardName.MOHOLE_EXCAVATION_REBALANCED, Factory: MoholeExcavationRebalanced},
    {cardName: CardName.MOHOLE_REBALANCED, Factory: MoholeRebalanced},
    {cardName: CardName.NITROGEN_SHIPMENT_REBALANCED, Factory: NitrogenDeliveryRebalanced},
    {cardName: CardName.POLAR_INDUSTRIES_REBALANCED, Factory: PolarIndustriesRebalanced},
    {cardName: CardName.SELF_SUFFICIENT_SETTLEMENT_REBALANCED, Factory: SelfSufficientSettlementRebalanced},
    {cardName: CardName.SMELTING_PLANT_REBALANCED, Factory: SmeltingPlantRebalanced},
    {cardName: CardName.SOCIETY_SUPPORT_REBALANCED, Factory: SocietySupportRebalanced},
    {cardName: CardName.SUPPLY_DROP_REBALANCED, Factory: SupplyDropRebalanced},
  ],
  standardProjects: [
    {cardName: CardName.BUILD_COLONY_STANDARD_PROJECT_REBALANCED, Factory: BuildColonyStandardProjectRebalanced, compatibility: GameModule.Colonies},
  ],
  cardsToRemove: [
    // projects
    CardName.AEROBRAKED_AMMONIA_ASTEROID,
    CardName.ASTEROID_HOLLOWING,
    CardName.BACTOVIRAL_RESEARCH,
    CardName.EARTH_CATAPULT,
    CardName.EXTRACTOR_BALLOONS,
    CardName.FORCED_PRECIPITATION,
    CardName.GHG_IMPORT_FROM_VENUS,
    CardName.GMO_CONTRACT,
    CardName.MARS_UNIVERSITY,
    CardName.ORBITAL_CLEANUP,
    CardName.SPINOFF_DEPARTMENT,
    CardName.STRATOPOLIS,
    CardName.TOLL_STATION,
    CardName.UNDERGROUND_DETONATIONS,
    // corporations
    CardName.APHRODITE,
    CardName.ARCADIAN_COMMUNITIES,
    CardName.ARIDOR,
    CardName.ARKLIGHT,
    CardName.ASTRODRILL,
    CardName.CELESTIC,
    CardName.CHEUNG_SHING_MARS,
    CardName.ECOLINE,
    CardName.FACTORUM,
    CardName.HELION,
    CardName.INTERPLANETARY_CINEMATICS,
    CardName.INVENTRIX,
    CardName.MINING_GUILD,
    CardName.MONS_INSURANCE,
    CardName.MORNING_STAR_INC,
    CardName.PHOBOLOG,
    CardName.POINT_LUNA,
    CardName.POLYPHEMOS,
    CardName.POSEIDON,
    CardName.PRISTAR,
    CardName.RECYCLON,
    CardName.ROBINSON_INDUSTRIES,
    CardName.SPLICE,
    CardName.STORMCRAFT_INCORPORATED,
    CardName.TERRALABS_RESEARCH,
    CardName.THARSIS_REPUBLIC,
    CardName.THORGATE,
    CardName.UNITED_NATIONS_MARS_INITIATIVE,
    CardName.UTOPIA_INVEST,
    CardName.VIRON,
    CardName.VITOR,
    // preludes
    CardName.BIOFUELS,
    CardName.BIOSPHERE_SUPPORT,
    CardName.DOME_FARMING,
    CardName.DONATION,
    CardName.EARLY_SETTLEMENT,
    CardName.ECCENTRIC_SPONSOR,
    CardName.GALILEAN_MINING,
    CardName.HUGE_ASTEROID,
    CardName.IO_RESEARCH_OUTPOST,
    CardName.LOAN,
    CardName.METALS_COMPANY,
    CardName.MOHOLE,
    CardName.MOHOLE_EXCAVATION,
    CardName.NITROGEN_SHIPMENT,
    CardName.POLAR_INDUSTRIES,
    CardName.SELF_SUFFICIENT_SETTLEMENT,
    CardName.SMELTING_PLANT,
    CardName.SOCIETY_SUPPORT,
    CardName.SUPPLY_DROP,
    // standard project
    CardName.BUILD_COLONY_STANDARD_PROJECT,
  ],
});
