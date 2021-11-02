import {CardName} from '../CardName';
import {MAX_OCEAN_TILES, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, MAX_VENUS_SCALE} from '../constants';
import {PlayerModel} from '../models/PlayerModel';
import {TerraformingUnits} from '../TerraformingUnits';

class TRBonus {
  public units: TerraformingUnits;
  constructor(partialUnits: Partial<TerraformingUnits>) {
    this.units = TerraformingUnits.of(partialUnits);
  }
}

export const ALL_TERRAFORMING_CARDS: Map<CardName, TRBonus> = new Map([

  [CardName.DEEP_WELL_HEATING, new TRBonus({temperature: 1})],
  [CardName.ASTEROID, new TRBonus({temperature: 1})],
  [CardName.COMET, new TRBonus({temperature: 1, ocean: 1})],
  [CardName.BIG_ASTEROID, new TRBonus({temperature: 2})],
  [CardName.IMPORTED_HYDROGEN, new TRBonus({ocean: 1})],
  [CardName.BLACK_POLAR_DUST, new TRBonus({ocean: 1})],
  [CardName.RELEASE_OF_INERT_GASES, new TRBonus({tr: 2})],
  [CardName.NITROGEN_RICH_ASTEROID, new TRBonus({temperature: 1, tr: 2})],
  [CardName.DEIMOS_DOWN, new TRBonus({temperature: 3})],
  [CardName.DEIMOS_DOWN_PROMO, new TRBonus({temperature: 3})],
  [CardName.LAKE_MARINERIS, new TRBonus({ocean: 2})],
  [CardName.MANGROVE, new TRBonus({oxygen: 1})],
  [CardName.MINING_EXPEDITION, new TRBonus({oxygen: 1})],
  [CardName.TOWING_A_COMET, new TRBonus({oxygen: 1, ocean: 1})],
  [CardName.GIANT_ICE_ASTEROID, new TRBonus({temperature: 2, ocean: 2})],
  [CardName.NUCLEAR_ZONE, new TRBonus({temperature: 2})],
  [CardName.ARTIFICIAL_LAKE, new TRBonus({ocean: 1})],
  [CardName.SUBTERRANEAN_RESERVOIR, new TRBonus({ocean: 1})],
  [CardName.STRIP_MINE, new TRBonus({oxygen: 2})],
  [CardName.LAVA_FLOWS, new TRBonus({temperature: 2})],
  [CardName.LARGE_CONVOY, new TRBonus({ocean: 1})],
  [CardName.CONVOY_FROM_EUROPA, new TRBonus({ocean: 1})],
  [CardName.IMPORTED_NITROGEN, new TRBonus({tr: 1})],
  [CardName.MAGNETIC_FIELD_GENERATORS, new TRBonus({tr: 3})],
  [CardName.MAGNETIC_FIELD_GENERATORS_PROMO, new TRBonus({tr: 3})],
  [CardName.MAGNETIC_FIELD_DOME, new TRBonus({tr: 1})],
  [CardName.PROTECTED_VALLEY, new TRBonus({oxygen: 1})],
  [CardName.ICE_CAP_MELTING, new TRBonus({ocean: 1})],
  [CardName.FLOODING, new TRBonus({ocean: 1})],
  [CardName.PERMAFROST_EXTRACTION, new TRBonus({ocean: 1})],
  [CardName.PLANTATION, new TRBonus({oxygen: 1})],
  [CardName.RAD_CHEM_FACTORY, new TRBonus({tr: 2})],
  [CardName.BRIBED_COMMITTEE, new TRBonus({tr: 2})],
  [CardName.SMALL_ASTEROID, new TRBonus({temperature: 1})],
  [CardName.AIR_SCRAPPING_EXPEDITION, new TRBonus({venus: 1})],
  [CardName.ATMOSCOOP, new TRBonus({temperature: 2})],
  [CardName.COMET_FOR_VENUS, new TRBonus({venus: 1})],
  [CardName.GHG_IMPORT_FROM_VENUS, new TRBonus({venus: 1})],
  [CardName.GIANT_SOLAR_SHADE, new TRBonus({venus: 3})],
  [CardName.HYDROGEN_TO_VENUS, new TRBonus({venus: 1})],
  [CardName.NEUTRALIZER_FACTORY, new TRBonus({venus: 1})],
  [CardName.OMNICOURT, new TRBonus({tr: 2})],
  [CardName.ORBITAL_REFLECTORS, new TRBonus({venus: 2})],
  [CardName.SPIN_INDUCING_ASTEROID, new TRBonus({venus: 2})],
  [CardName.SULPHUR_EXPORTS, new TRBonus({venus: 1})],
  [CardName.WATER_TO_VENUS, new TRBonus({venus: 1})],
  [CardName.VENUS_SOILS, new TRBonus({venus: 1})],
  [CardName.VENUSIAN_PLANTS, new TRBonus({venus: 1})],
  [CardName.ICE_MOON_COLONY, new TRBonus({ocean: 1})],
  [CardName.JOVIAN_LANTERNS, new TRBonus({tr: 1})],
  [CardName.NITROGEN_FROM_TITAN, new TRBonus({tr: 2})],
  [CardName.PR_OFFICE, new TRBonus({tr: 1})],
  [CardName.WILDLIFE_DOME, new TRBonus({oxygen: 1})],
  [CardName.VOTE_OF_NO_CONFIDENCE, new TRBonus({tr: 1})],
  [CardName.POLITICAL_ALLIANCE, new TRBonus({tr: 1})],
  [CardName.DIVERSITY_SUPPORT, new TRBonus({tr: 1})],
  [CardName.JOVIAN_EMBASSY, new TRBonus({tr: 1})],
  [CardName.MAGNETIC_SHIELD, new TRBonus({tr: 4})],
  [CardName.MOHOLE_LAKE, new TRBonus({temperature: 1, ocean: 1})],

  [CardName.CONVERT_PLANTS, new TRBonus({oxygen: 1})],
  [CardName.CONVERT_HEAT, new TRBonus({temperature: 1})],

  [CardName.ASTEROID_STANDARD_PROJECT, new TRBonus({temperature: 1})],
  [CardName.GREENERY_STANDARD_PROJECT, new TRBonus({oxygen: 1})],
  [CardName.AQUIFER_STANDARD_PROJECT, new TRBonus({ocean: 1})],
  [CardName.AIR_SCRAPPING_STANDARD_PROJECT, new TRBonus({venus: 1})],
  [CardName.BUFFER_GAS_STANDARD_PROJECT, new TRBonus({tr: 1})],
]);

export function calculateTRGain(player: PlayerModel, card: CardName): number {
  if (ALL_TERRAFORMING_CARDS.has(card) === false) {
    return 0;
  } else {
    let oxygenStepsToRaise = 0;
    let tempStepsToRaise = 0;
    let oceanStepToRaise = 0;
    let venusStepsToRaise = 0;
    let directTRRAised = 0;

    const remainingOxygenSteps = (MAX_OXYGEN_LEVEL - player.game.oxygenLevel);
    oxygenStepsToRaise += ALL_TERRAFORMING_CARDS.get(card)!.units.oxygen;
    const oxygenStepsRaised = Math.min(remainingOxygenSteps, oxygenStepsToRaise);
    if (player.game.oxygenLevel < 8 && player.game.oxygenLevel + oxygenStepsRaised >= 8) {
      tempStepsToRaise++;
    }

    const remainingTemperatureSteps = (MAX_TEMPERATURE - player.game.temperature) / 2;
    tempStepsToRaise += ALL_TERRAFORMING_CARDS.get(card)!.units.temperature;
    const tempStepsRaised = Math.min(remainingTemperatureSteps, tempStepsToRaise);
    if (player.game.temperature < 0 && player.game.temperature + tempStepsRaised * 2 >= 0) {
      oceanStepToRaise++;
    }

    const remainingOceans = (MAX_OCEAN_TILES - player.game.oceans);
    oceanStepToRaise += ALL_TERRAFORMING_CARDS.get(card)!.units.ocean;
    const oceanStepsRaised = Math.min(remainingOceans, oceanStepToRaise);

    const remaingVenusSteps = (MAX_VENUS_SCALE - player.game.venusScaleLevel) / 2;
    venusStepsToRaise += ALL_TERRAFORMING_CARDS.get(card)!.units.venus;
    const venusStepsRaised = Math.min(remaingVenusSteps, venusStepsToRaise);
    if (player.game.venusScaleLevel < 16 && player.game.venusScaleLevel + venusStepsRaised * 2 >= 16) {
      directTRRAised++;
    }

    directTRRAised += ALL_TERRAFORMING_CARDS.get(card)!.units.tr;

    return tempStepsRaised + oxygenStepsRaised + oceanStepsRaised + venusStepsRaised + directTRRAised;
  }
}
