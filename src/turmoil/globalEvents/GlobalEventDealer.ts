import {GlobalEventName} from './GlobalEventName';
import {IGlobalEvent} from './IGlobalEvent';
import {GlobalDustStorm} from './GlobalDustStorm';
import {AquiferReleasedByPublicCouncil} from './AquiferReleasedByPublicCouncil';
import {AsteroidMining} from './AsteroidMining';
import {CelebrityLeaders} from './CelebrityLeaders';
import {CloudSocieties} from './CloudSocieties';
import {CorrosiveRainRebalanced} from './CorrosiveRainRebalanced';
import {CorrosiveRain} from './CorrosiveRain';
import {Diversity} from './Diversity';
import {DryDeserts} from './DryDeserts';
import {EcoSabotageRebalanced} from './EcoSabotageRebalanced';
import {EcoSabotage} from './EcoSabotage';
import {Election} from './Election';
import {Game} from '../../Game';
import {GenerousFunding} from './GenerousFunding';
import {GlobalDustStormRebalanced} from './GlobalDustStormRebalanced';
import {HeatedDiscussions} from './league/HeatedDiscussions';
import {HomeworldSupport} from './HomeworldSupport';
import {ISerializable} from '../../ISerializable';
import {ImprovedEnergyTemplates} from './ImprovedEnergyTemplates';
import {InterplanetaryTrade} from './InterplanetaryTrade';
import {JovianTaxRights} from './JovianTaxRights';
import {LeadershipSummit} from './LeadershipSummit';
import {MicrogravityHealthProblems} from './MicrogravityHealthProblems';
import {MinersOnStrike} from './MinersOnStrike';
import {MudSlides} from './MudSlides';
import {Pandemic} from './Pandemic';
import {ParadigmBreakdown} from './ParadigmBreakdown';
import {Productivity} from './Productivity';
import {RedInfluence} from './RedInfluence';
import {Revolution} from './Revolution';
import {Riots} from './Riots';
import {Sabotage} from './Sabotage';
import {ScientificCommunityRebalanced} from './ScientificCommunityRebalanced';
import {ScientificCommunity} from './ScientificCommunity';
import {SealockedHolmes} from './league/SealockedHolmes';
import {SerializedGlobalEventDealer} from './SerializedGlobalEventDealer';
import {SnowCover} from './SnowCover';
import {SolarFlare} from './SolarFlare';
import {SolarnetShutdown} from './SolarnetShutdown';
import {SpinoffProducts} from './SpinoffProducts';
import {SponsoredProjects} from './SponsoredProjects';
import {StrongSociety} from './StrongSociety';
import {SuccessfulOrganisms} from './SuccessfulOrganisms';
import {VenusInfrastructure} from './VenusInfrastructure';
import {VolcanicEruptions} from './VolcanicEruptions';
import {WarOnEarth} from './WarOnEarth';

const COLONY_ONLY_POSITIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.JOVIAN_TAX_RIGHTS, JovianTaxRights],
]);

const COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.MICROGRAVITY_HEALTH_PROBLEMS, MicrogravityHealthProblems],
]);

const VENUS_COLONY_POSITIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.CLOUD_SOCIETIES, CloudSocieties],
]);

const VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.CORROSIVE_RAIN, CorrosiveRain],
]);

const VENUS_POSITIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.VENUS_INFRASTRUCTURE, VenusInfrastructure],
]);

const LEAGUE_NEGATIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.HEATED_DISCUSSIONS, HeatedDiscussions],
  [GlobalEventName.SEALOCKED_HOLMES, SealockedHolmes],
]);

// ALL POSITIVE GLOBAL EVENTS
const POSITIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL, AquiferReleasedByPublicCouncil],
  [GlobalEventName.ASTEROID_MINING, AsteroidMining],
  [GlobalEventName.CELEBRITY_LEADERS, CelebrityLeaders],
  [GlobalEventName.DIVERSITY, Diversity],
  [GlobalEventName.ELECTION, Election],
  [GlobalEventName.GENEROUS_FUNDING, GenerousFunding],
  [GlobalEventName.HOMEWORLD_SUPPORT, HomeworldSupport],
  [GlobalEventName.IMPROVED_ENERGY_TEMPLATES, ImprovedEnergyTemplates],
  [GlobalEventName.INTERPLANETARY_TRADE, InterplanetaryTrade],
  [GlobalEventName.PRODUCTIVITY, Productivity],
  [GlobalEventName.SCIENTIFIC_COMMUNITY, ScientificCommunity],
  [GlobalEventName.SPINOFF_PRODUCTS, SpinoffProducts],
  [GlobalEventName.SPONSORED_PROJECTS, SponsoredProjects],
  [GlobalEventName.STRONG_SOCIETY, StrongSociety],
  [GlobalEventName.SUCCESSFUL_ORGANISMS, SuccessfulOrganisms],
  [GlobalEventName.VOLCANIC_ERUPTIONS, VolcanicEruptions],
]);

// ALL NEGATIVE GLOBAL EVENTS
const NEGATIVE_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.DRY_DESERTS, DryDeserts],
  [GlobalEventName.ECO_SABOTAGE, EcoSabotage],
  [GlobalEventName.GLOBAL_DUST_STORM, GlobalDustStorm],
  [GlobalEventName.MINERS_ON_STRIKE, MinersOnStrike],
  [GlobalEventName.MUD_SLIDES, MudSlides],
  [GlobalEventName.PANDEMIC, Pandemic],
  [GlobalEventName.PARADIGM_BREAKDOWN, ParadigmBreakdown],
  [GlobalEventName.RED_INFLUENCE, RedInfluence],
  [GlobalEventName.REVOLUTION, Revolution],
  [GlobalEventName.RIOTS, Riots],
  [GlobalEventName.SABOTAGE, Sabotage],
  [GlobalEventName.SNOW_COVER, SnowCover],
  [GlobalEventName.SOLARNET_SHUTDOWN, SolarnetShutdown],
  [GlobalEventName.SOLAR_FLARE, SolarFlare],
  [GlobalEventName.WAR_ON_EARTH, WarOnEarth],
]);

const COMMUNITY_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.LEADERSHIP_SUMMIT, LeadershipSummit],
]);

// When renaming, add the rename here and add a TODO (like the example below)
// And remember to add a test in GlobalEventDealer.spec.ts
const RENAMED_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  // TODO(bafolts): remove after 2021-05-08
  ['Miners Of Strike' as GlobalEventName, MinersOnStrike],
]);

const EVENTS_REPLACED_BY_REBALANCED = [
  GlobalEventName.GLOBAL_DUST_STORM,
  GlobalEventName.ECO_SABOTAGE,
  GlobalEventName.SCIENTIFIC_COMMUNITY,
  GlobalEventName.CORROSIVE_RAIN,
];

// ALL NEGATIVE GLOBAL EVENTS
const REBALANCED_GLOBAL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  [GlobalEventName.GLOBAL_DUST_STORM_REBALANCED, GlobalDustStormRebalanced],
  [GlobalEventName.ECO_SABOTAGE_REBALANCED, EcoSabotageRebalanced],
  [GlobalEventName.SCIENTIFIC_COMMUNITY_REBALANCED, ScientificCommunityRebalanced],
  [GlobalEventName.CORROSIVE_RAIN_REBALANCED, CorrosiveRainRebalanced],
]);

const ALL_EVENTS = new Map<GlobalEventName, new() => IGlobalEvent>([
  ...Array.from(POSITIVE_GLOBAL_EVENTS),
  ...Array.from(NEGATIVE_GLOBAL_EVENTS),
  ...Array.from(COLONY_ONLY_POSITIVE_GLOBAL_EVENTS),
  ...Array.from(COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS),
  ...Array.from(VENUS_COLONY_POSITIVE_GLOBAL_EVENTS),
  ...Array.from(VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS),
  ...Array.from(VENUS_POSITIVE_GLOBAL_EVENTS),
  ...Array.from(COMMUNITY_GLOBAL_EVENTS),
  ...Array.from(RENAMED_GLOBAL_EVENTS),
  ...Array.from(REBALANCED_GLOBAL_EVENTS),
]);


// Function to return a global event object by its name
export function getGlobalEventByName(globalEventName: GlobalEventName): IGlobalEvent | undefined {
  const Factory = ALL_EVENTS.get(globalEventName);

  if (Factory !== undefined) return new Factory();
  return undefined;
}

export class GlobalEventDealer implements ISerializable<SerializedGlobalEventDealer> {
  constructor(
    public readonly globalEventsDeck: Array<IGlobalEvent>,
    public readonly discardedGlobalEvents: Array<IGlobalEvent>) {}

  public static newInstance(game: Game): GlobalEventDealer {
    let events = Array.from(POSITIVE_GLOBAL_EVENTS);

    if (!game.gameOptions.removeNegativeGlobalEventsOption) {
      events.push(...Array.from(NEGATIVE_GLOBAL_EVENTS));
      if (game.gameOptions.coloniesExtension) events.push(...Array.from(COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS));

      if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
        events.push(...Array.from(VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS));
      }

      if (game.gameOptions.leagueExtension) events.push(...Array.from(LEAGUE_NEGATIVE_GLOBAL_EVENTS));
    }

    if (game.gameOptions.venusNextExtension) events.push(...Array.from(VENUS_POSITIVE_GLOBAL_EVENTS));

    if (game.gameOptions.coloniesExtension) events.push(...Array.from(COLONY_ONLY_POSITIVE_GLOBAL_EVENTS));

    if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
      events.push(...Array.from(VENUS_COLONY_POSITIVE_GLOBAL_EVENTS));
    }

    if (game.gameOptions.communityCardsOption) events.push(...Array.from(COMMUNITY_GLOBAL_EVENTS));

    // Add rebalanced events and remove the corresponding ones
    if (game.gameOptions.rebalancedExtension) {
      events = events.filter((event) => EVENTS_REPLACED_BY_REBALANCED.includes(event[0]) === false);
      events.push([GlobalEventName.SCIENTIFIC_COMMUNITY_REBALANCED, ScientificCommunityRebalanced]);
      if (!game.gameOptions.removeNegativeGlobalEventsOption) {
        events.push([GlobalEventName.GLOBAL_DUST_STORM_REBALANCED, GlobalDustStormRebalanced]);
        events.push([GlobalEventName.ECO_SABOTAGE_REBALANCED, EcoSabotageRebalanced]);
        if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
          events.push([GlobalEventName.CORROSIVE_RAIN_REBALANCED, CorrosiveRainRebalanced]);
        };
      }
    }

    const globalEventsDeck = this.shuffle(events.map((cf) => new cf[1]));
    return new GlobalEventDealer(globalEventsDeck, []);
  };

  private static shuffle(cards: Array<IGlobalEvent>): Array<IGlobalEvent> {
    const deck: Array<IGlobalEvent> = [];
    const copy = cards.slice();
    while (copy.length) {
      deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return deck;
  }

  public draw(): IGlobalEvent | undefined {
    return this.globalEventsDeck.pop();
  }

  public serialize(): SerializedGlobalEventDealer {
    return {
      deck: this.globalEventsDeck.map((card) => card.name),
      discarded: this.discardedGlobalEvents.map((card) => card.name),
    };
  }

  public static deserialize(d: SerializedGlobalEventDealer): GlobalEventDealer {
    const deck = d.deck.map((element: GlobalEventName) => {
      return getGlobalEventByName(element)!;
    });

    const discardPile = d.discarded.map((element: GlobalEventName) => {
      return getGlobalEventByName(element)!;
    });
    return new GlobalEventDealer(deck, discardPile);
  }
}
