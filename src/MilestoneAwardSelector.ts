import {ARES_AWARDS, Awards, ELYSIUM_AWARDS, HELLAS_AWARDS, MOON_AWARDS, ORIGINAL_AWARDS, TRAJECTORY_AWARDS, VENUS_AWARDS} from './awards/Awards';
import {Banker} from './awards/Banker';
import {Benefactor} from './awards/Benefactor';
import {Celebrity} from './awards/Celebrity';
import {Contractor} from './awards/Contractor';
import {Cultivator} from './awards/Cultivator';
import {DesertSettler} from './awards/DesertSettler';
import {Entrepreneur} from './awards/Entrepreneur';
import {EstateDealer} from './awards/EstateDealer';
import {Excentric} from './awards/Excentric';
import {IAward} from './awards/IAward';
import {Industrialist} from './awards/Industrialist';
import {Landlord} from './awards/Landlord';
import {Magnate} from './awards/Magnate';
import {Miner} from './awards/Miner';
import {Scientist} from './awards/Scientist';
import {SpaceBaron} from './awards/SpaceBaron';
import {Thermalist} from './awards/Thermalist';
import {Adapter} from './awards/trajectoryAwards/Adapter';
import {Biologist} from './awards/trajectoryAwards/Biologist';
import {Coordinator} from './awards/trajectoryAwards/Coordinator';
import {Distributer} from './awards/trajectoryAwards/Distributer';
import {EdgeDancer} from './awards/trajectoryAwards/EdgeDancer';
import {Energetic} from './awards/trajectoryAwards/Energetic';
import {Equatorial} from './awards/trajectoryAwards/Equatorial';
import {Highlander} from './awards/trajectoryAwards/Highlander';
import {Importer} from './awards/trajectoryAwards/Importer';
import {Microeconomist} from './awards/trajectoryAwards/Microeconomist';
import {Naturalist} from './awards/trajectoryAwards/Naturalist';
import {Originalist} from './awards/trajectoryAwards/Originalist';
import {UrbanPlanner} from './awards/trajectoryAwards/UrbanPlanner';
import {Venuphile} from './awards/Venuphile';
import {BoardName} from './boards/BoardName';
import {GameOptions} from './Game';
import {IDrawnMilestonesAndAwards} from './IDrawnMilestonesAndAwards';
import {Builder} from './milestones/Builder';
import {Diversifier} from './milestones/Diversifier';
import {Ecologist} from './milestones/Ecologist';
import {Energizer} from './milestones/Energizer';
import {Gardener} from './milestones/Gardener';
import {Generalist} from './milestones/Generalist';
import {Hoverlord} from './milestones/Hoverlord';
import {IMilestone} from './milestones/IMilestone';
import {Legend} from './milestones/Legend';
import {Mayor} from './milestones/Mayor';
import {ARES_MILESTONES, ELYSIUM_MILESTONES, HELLAS_MILESTONES, Milestones, MOON_MILESTONES, ORIGINAL_MILESTONES, TRAJECTORY_MILESTONES, TRAJECTORY_VENUS_MILESTONES, VENUS_MILESTONES} from './milestones/Milestones';
import {Networker} from './milestones/Networker';
import {Planner} from './milestones/Planner';
import {PolarExplorer} from './milestones/PolarExplorer';
import {RimSettler} from './milestones/RimSettler';
import {Specialist} from './milestones/Specialist';
import {Tactician} from './milestones/Tactician';
import {Terraformer} from './milestones/Terraformer';
import {Astronomer} from './milestones/trajectoryMilestones/Astronomer';
import {Collector} from './milestones/trajectoryMilestones/Collector';
import {Colonizer} from './milestones/trajectoryMilestones/Colonizer';
import {Farmer} from './milestones/trajectoryMilestones/Farmer';
import {FrontRunner} from './milestones/trajectoryMilestones/FrontRunner';
import {Irrigator} from './milestones/trajectoryMilestones/Irrigator';
import {Minimalist} from './milestones/trajectoryMilestones/Minimalist';
import {MorningStar} from './milestones/trajectoryMilestones/MorningStar';
import {Pioneer} from './milestones/trajectoryMilestones/Pioneer';
import {Sapling} from './milestones/trajectoryMilestones/Sapling';
import {Setter} from './milestones/trajectoryMilestones/Setter';
import {Smith} from './milestones/trajectoryMilestones/Smith';
import {Spacefarer} from './milestones/trajectoryMilestones/Spacefarer';
import {Terran} from './milestones/trajectoryMilestones/Terran';
import {Tropicalist} from './milestones/trajectoryMilestones/Tropicalist';
import {Tycoon} from './milestones/Tycoon';
import {FullMoon} from './moon/FullMoon';
import {Lunarchitect} from './moon/Lunarchitect';
import {LunarMagnate} from './moon/LunarMagnate';
import {OneGiantStep} from './moon/OneGiantStep';
import {RandomMAOptionType} from './RandomMAOptionType';

export namespace MilestoneAwardSelector {
  // This map uses keys of the format "X|Y" where X and Y are MA names. Entries are stored as "X|Y"
  // and also "Y|X"; it just makes searching slightly faster. There will also be entries of the type "X|X".
  //
  // I honestly don't remember why "X|X" is useful, and it's possible it's no longer necessary. That's
  // something that should be carefully conisdered and possibly removed, and not just propagated because
  // it's what we had to begin with. In other words, someone figure out why, and preserve it, and document
  // why, or be certain it's unnecessary and remove this paragraph and the code below that sets "X|X" to 1000.
  //
  class SynergyMap {
    private readonly map: Map<string, number> = new Map();

    public set(a: string, b: string, weight: number): void {
      this.map.set(a + '|' + b, weight);
      this.map.set(b + '|' + a, weight);
    }

    public get(a: string, b: string) {
      return this.map.get(a + '|' + b) || 0;
    }
  }

  class Synergies {
    public static map: SynergyMap = Synergies.makeMap();

    private constructor() {
    }

    private static makeMap(): SynergyMap {
      const synergies = new SynergyMap();

      // Higher synergies represent similar milestones or awards. For instance, Terraformer rewards for high TR
      // and the Benefactor award is given to the player with the highets TR. Their synergy weight is 9, very high.
      function bind(A: { new(): IMilestone | IAward }, B: { new(): IMilestone | IAward }, weight: number): void;
      function bind(a: string, b: string, weight: number): void;
      function bind(A: any, B: any, weight: number): void {
        if (typeof A === 'string') {
          synergies.set(A, B, weight);
        } else {
          synergies.set(new A().name, new B().name, weight);
        }
      }

      Milestones.ALL.forEach((ma) => {
        bind(ma.name, ma.name, 1000);
      });
      Awards.ALL.forEach((ma) => {
        bind(ma.name, ma.name, 1000);
      });

      bind(Terraformer, Benefactor, 9);
      bind(Gardener, Cultivator, 9);
      bind(Builder, Contractor, 9);
      bind(Networker, Entrepreneur, 9);
      bind(OneGiantStep, FullMoon, 9);
      bind(Lunarchitect, LunarMagnate, 9);
      bind(OneGiantStep, Lunarchitect, 9);
      bind(FullMoon, LunarMagnate, 9);
      bind(EstateDealer, Cultivator, 8);
      bind(Landlord, Cultivator, 8);
      bind(Landlord, DesertSettler, 7);
      bind(Landlord, EstateDealer, 7);
      bind(DesertSettler, Cultivator, 7);
      bind(Miner, Industrialist, 7);
      bind(OneGiantStep, LunarMagnate, 7);
      bind(Lunarchitect, FullMoon, 7);
      bind(Energizer, Industrialist, 6);
      bind(Gardener, Landlord, 6);
      bind(Mayor, Landlord, 6);
      bind(Mayor, Cultivator, 6);
      bind(Gardener, EstateDealer, 5);
      bind(Planner, Magnate, 5);
      bind(Tycoon, Magnate, 5);
      bind(PolarExplorer, DesertSettler, 8);
      bind(Hoverlord, Excentric, 5);
      bind(Hoverlord, Venuphile, 5);
      bind(DesertSettler, EstateDealer, 5);
      bind(Builder, Tycoon, 4);
      bind(Specialist, Energizer, 4);
      bind(Mayor, PolarExplorer, 4);
      bind(Mayor, DesertSettler, 4);
      bind(Mayor, EstateDealer, 4);
      bind(Gardener, PolarExplorer, 4);
      bind(Gardener, DesertSettler, 4);
      bind(Ecologist, Excentric, 4);
      bind(PolarExplorer, Landlord, 4);
      bind(Mayor, Gardener, 3);
      bind(Tycoon, Excentric, 3);
      bind(PolarExplorer, Cultivator, 3);
      bind(Energizer, Thermalist, 3);
      bind(RimSettler, SpaceBaron, 3);
      bind(Celebrity, SpaceBaron, 3);
      bind(Benefactor, Cultivator, 3);
      bind(Gardener, Benefactor, 2);
      bind(Specialist, Banker, 2);
      bind(Ecologist, Tycoon, 2);
      bind(Ecologist, Diversifier, 2);
      bind(Tycoon, Scientist, 2);
      bind(Tycoon, Contractor, 2);
      bind(Tycoon, Venuphile, 2);
      bind(PolarExplorer, EstateDealer, 2);
      bind(RimSettler, Celebrity, 2);
      bind(Scientist, Magnate, 2);
      bind(Magnate, SpaceBaron, 2);
      bind(Excentric, Venuphile, 2);
      bind(Terraformer, Cultivator, 2);
      bind(Terraformer, Gardener, 2);
      bind(Builder, Miner, 1);
      bind(Builder, Industrialist, 1);
      bind(Planner, Scientist, 1);
      bind(Generalist, Miner, 1);
      bind(Specialist, Thermalist, 1);
      bind(Specialist, Miner, 1);
      bind(Specialist, Industrialist, 1);
      bind(Ecologist, Cultivator, 1);
      bind(Ecologist, Magnate, 1);
      bind(Tycoon, Diversifier, 1);
      bind(Tycoon, Tactician, 1);
      bind(Tycoon, RimSettler, 1);
      bind(Tycoon, SpaceBaron, 1);
      bind(Diversifier, Magnate, 1);
      bind(Tactician, Scientist, 1);
      bind(Tactician, Magnate, 1);
      bind(RimSettler, Magnate, 1);
      bind(Banker, Benefactor, 1);
      bind(Celebrity, Magnate, 1);
      bind(DesertSettler, Benefactor, 1);
      bind(EstateDealer, Benefactor, 1);
      bind(Terraformer, Landlord, 1);
      bind(Terraformer, Thermalist, 1);
      bind(Terraformer, DesertSettler, 1);
      bind(Terraformer, EstateDealer, 1);
      bind(Gardener, Ecologist, 1);

      // Trajectory Milestones and Awards Synergy

      bind(Irrigator, Mayor, 4);
      bind(Irrigator, Gardener, 4);
      bind(Irrigator, PolarExplorer, 4);
      bind(Irrigator, Landlord, 5);
      bind(Irrigator, DesertSettler, 5);
      bind(Irrigator, EstateDealer, 9);
      bind(Irrigator, Cultivator, 4);
      bind(Irrigator, Equatorial, 4);
      bind(Irrigator, Naturalist, 3);
      bind(Irrigator, Terraformer, 2);

      bind(Astronomer, Generalist, 1);
      bind(Astronomer, Specialist, 1);
      bind(Astronomer, Tycoon, 2);
      bind(Astronomer, Diversifier, 4);
      bind(Astronomer, RimSettler, 6);
      bind(Astronomer, Magnate, 1);
      bind(Astronomer, SpaceBaron, 1);
      bind(Astronomer, Venuphile, 4);

      bind(Spacefarer, Generalist, 1);
      bind(Spacefarer, Specialist, 1);
      bind(Spacefarer, Tycoon, 2);
      bind(Spacefarer, RimSettler, 4);
      bind(Spacefarer, Magnate, 1);
      bind(Spacefarer, SpaceBaron, 9);
      bind(Spacefarer, Astronomer, 3);
      bind(Spacefarer, Miner, 4);

      bind(FrontRunner, Ecologist, 1);
      bind(FrontRunner, Tycoon, 1);
      bind(FrontRunner, Diversifier, 1);
      bind(FrontRunner, Tactician, 1);

      bind(Pioneer, Mayor, 8);
      bind(Pioneer, Gardener, 8);
      bind(Pioneer, PolarExplorer, 8);
      bind(Pioneer, Landlord, 6);
      bind(Pioneer, DesertSettler, 6);
      bind(Pioneer, EstateDealer, 4);
      bind(Pioneer, EdgeDancer, 4);
      bind(Pioneer, Equatorial, 4);
      bind(Pioneer, Highlander, 4);

      bind(Terran, Specialist, 3);
      bind(Terran, Tycoon, 4);
      bind(Terran, Magnate, 4);
      bind(Terran, Astronomer, 7);

      bind(MorningStar, Tycoon, 1);
      bind(MorningStar, Hoverlord, 4);
      bind(MorningStar, Venuphile, 9);
      bind(MorningStar, Astronomer, 7);

      bind(Farmer, Gardener, 9);
      bind(Farmer, Generalist, 1);
      bind(Farmer, Ecologist, 9);
      bind(Farmer, Landlord, 9);
      bind(Farmer, DesertSettler, 9);
      bind(Farmer, EstateDealer, 9);
      bind(Farmer, Cultivator, 9);
      bind(Farmer, Irrigator, 9);
      bind(Farmer, Pioneer, 9);

      bind(EdgeDancer, Mayor, 2);
      bind(EdgeDancer, Gardener, 4);
      bind(EdgeDancer, PolarExplorer, 5);
      bind(EdgeDancer, DesertSettler, 5);
      bind(EdgeDancer, EstateDealer, 4);
      bind(EdgeDancer, Cultivator, 4);
      bind(EdgeDancer, Irrigator, 4);
      bind(EdgeDancer, Farmer, 4);
      bind(EdgeDancer, Equatorial, 4);
      bind(EdgeDancer, Highlander, 4);
      bind(EdgeDancer, Naturalist, 4);

      bind(Energetic, Specialist, 1);
      bind(Energetic, Energizer, 6);
      bind(Energetic, Thermalist, 6);
      bind(Energetic, Industrialist, 7);
      bind(Energetic, Contractor, 4);

      bind(Biologist, Cultivator, 4);
      bind(Biologist, Ecologist, 4);
      bind(Biologist, Excentric, 4);

      bind(UrbanPlanner, Mayor, 6);
      bind(UrbanPlanner, Gardener, 6);
      bind(UrbanPlanner, Landlord, 7);
      bind(UrbanPlanner, DesertSettler, 4);
      bind(UrbanPlanner, EstateDealer, 1);
      bind(UrbanPlanner, Cultivator, 7);
      bind(UrbanPlanner, Irrigator, 1);
      bind(UrbanPlanner, Pioneer, 2);

      bind(Coordinator, Terraformer, 3);
      bind(Coordinator, Legend, 5);
      bind(Coordinator, Benefactor, 4);

      bind(Importer, Energizer, 1);

      bind(Highlander, Mayor, 4);
      bind(Highlander, Gardener, 4);
      bind(Highlander, Landlord, 8);
      bind(Highlander, DesertSettler, 6);
      bind(Highlander, Cultivator, 8);
      bind(Highlander, Naturalist, 4);

      bind(Equatorial, Landlord, 8);
      bind(Equatorial, EstateDealer, 4);
      bind(Equatorial, Cultivator, 8);
      bind(Equatorial, Highlander, 4);
      bind(Equatorial, Naturalist, 4);

      bind(Adapter, Ecologist, 2);
      bind(Adapter, Tactician, 3);
      bind(Adapter, Scientist, 5);
      bind(Adapter, Biologist, 5);

      bind(Smith, Generalist, 2);
      bind(Smith, Specialist, 5);
      bind(Smith, RimSettler, 3);
      bind(Smith, Miner, 8);
      bind(Smith, Industrialist, 5);
      bind(Smith, Colonizer, 1);
      bind(Smith, Importer, 1);
      bind(Smith, Distributer, 2);
      bind(Smith, SpaceBaron, 4);
      bind(Smith, Contractor, 4);

      bind(Collector, Ecologist, 6);
      bind(Collector, Diversifier, 3);
      bind(Collector, Hoverlord, 6);
      bind(Collector, Excentric, 8);
      bind(Collector, Venuphile, 4);
      bind(Collector, Biologist, 4);

      bind(Colonizer, Generalist, 1);
      bind(Colonizer, Minimalist, 6);
      bind(Colonizer, Smith, 1);
      bind(Colonizer, Collector, 1);

      bind(Setter, Tycoon, 6);
      bind(Setter, Legend, 6);
      bind(Setter, Tactician, 2);
      bind(Setter, Magnate, 2);

      bind(Sapling, Gardener, 8);
      bind(Sapling, PolarExplorer, 4);
      bind(Sapling, Irrigator, 4);
      bind(Sapling, Pioneer, 4);
      bind(Sapling, Farmer, 8);
      bind(Sapling, EdgeDancer, 4);
      bind(Sapling, Equatorial, 4);
      bind(Sapling, Highlander, 4);
      bind(Sapling, Naturalist, 4);

      bind(Naturalist, Terraformer, 3);
      bind(Naturalist, Gardener, 2);
      bind(Naturalist, Generalist, 2);
      bind(Naturalist, Specialist, 1);
      bind(Naturalist, Landlord, 4);
      bind(Naturalist, Thermalist, 6);
      bind(Naturalist, DesertSettler, 1);
      bind(Naturalist, EstateDealer, 1);
      bind(Naturalist, Benefactor, 5);
      bind(Naturalist, Cultivator, 3);
      bind(Naturalist, EdgeDancer, 3);
      bind(Naturalist, Highlander, 3);
      bind(Naturalist, Equatorial, 3);

      bind(Microeconomist, Planner, 2);
      bind(Microeconomist, Tycoon, 2);
      bind(Microeconomist, Excentric, 2);
      bind(Microeconomist, Biologist, 2);

      bind(Distributer, Generalist, 3);

      bind(Originalist, Benefactor, 2);

      bind(Tropicalist, Mayor, 6);
      bind(Tropicalist, Gardener, 6);
      bind(Tropicalist, Gardener, 6);
      bind(Tropicalist, DesertSettler, 2);
      bind(Tropicalist, Irrigator, 6);
      bind(Tropicalist, EdgeDancer, 2);
      bind(Tropicalist, Highlander, 4);
      bind(Tropicalist, EstateDealer, 6);
      bind(Tropicalist, Pioneer, 9);
      bind(Tropicalist, Equatorial, 9);

      return synergies;
    }
  }

  function shuffle<T>(arr: Array<T>) {
    arr = arr.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // Function to compute max synergy of a given set of milestones and awards.
  // Exported for testing
  export function maximumSynergy(names: Array<string>): number {
    let max = 0;
    for (let i = 0; i < names.length - 1; i++) {
      for (let j = i + 1; j < names.length; j++) {
        const synergy = Synergies.map.get(names[i], names[j]);
        max = Math.max(synergy, max);
      }
    }
    return max;
  }

  export interface Constraints {
    // No pairing may have a synergy greater than this.
    maxSynergyAllowed: number;
    // Sum of all the synergies may be no greater than this.
    totalSynergyAllowed: number;
    // 3) Limited a number of pair with synergy at |highThreshold| or above to |numberOfHighAllowed| or below.
    numberOfHighAllowed: number;
    highThreshold: number;
  }

  export const LIMITED_SYNERGY: Constraints = {
    maxSynergyAllowed: 6,
    totalSynergyAllowed: 20,
    numberOfHighAllowed: 20,
    highThreshold: 4,
  };

  export const UNLIMITED_SYNERGY: Constraints = {
    maxSynergyAllowed: 100,
    totalSynergyAllowed: 100,
    numberOfHighAllowed: 100,
    highThreshold: 100,
  };

  export function chooseMilestonesAndAwards(gameOptions: GameOptions): IDrawnMilestonesAndAwards {
    let drawnMilestonesAndAwards: IDrawnMilestonesAndAwards = {
      milestones: [],
      awards: [],
    };

    const includeVenus = gameOptions.venusNextExtension && gameOptions.includeVenusMA;
    const requiredQty = includeVenus ? 6 : 5;

    switch (gameOptions.randomMA) {
    case RandomMAOptionType.NONE:
      switch (gameOptions.boardName) {
      case BoardName.ORIGINAL:
      case BoardName.AMAZONIS:
      case BoardName.ARABIA_TERRA:
      case BoardName.VASTITAS_BOREALIS:
      case BoardName.TERRA_CIMMERIA:
        drawnMilestonesAndAwards.milestones.push(...ORIGINAL_MILESTONES);
        drawnMilestonesAndAwards.awards.push(...ORIGINAL_AWARDS);
        break;
      case BoardName.HELLAS:
        drawnMilestonesAndAwards.milestones.push(...HELLAS_MILESTONES);
        drawnMilestonesAndAwards.awards.push(...HELLAS_AWARDS);
        break;
      case BoardName.ELYSIUM:
        drawnMilestonesAndAwards.milestones.push(...ELYSIUM_MILESTONES);
        drawnMilestonesAndAwards.awards.push(...ELYSIUM_AWARDS);
        break;
      }
      if (includeVenus) {
        drawnMilestonesAndAwards.milestones.push(...VENUS_MILESTONES);
        drawnMilestonesAndAwards.awards.push(...VENUS_AWARDS);
      }
      if (gameOptions.aresExtension) {
        drawnMilestonesAndAwards.milestones.push(...ARES_MILESTONES);
        drawnMilestonesAndAwards.awards.push(...ARES_AWARDS);
      }

      if (gameOptions.moonExpansion) {
        // One MA will reward moon tags, the other will reward moon tiles.
        if (Math.random() > 0.5) {
          drawnMilestonesAndAwards.milestones.push(new OneGiantStep());
          drawnMilestonesAndAwards.awards.push(new LunarMagnate());
        } else {
          drawnMilestonesAndAwards.milestones.push(new Lunarchitect());
          drawnMilestonesAndAwards.awards.push(new FullMoon());
        }
      }

      break;

    case RandomMAOptionType.LIMITED:
      drawnMilestonesAndAwards = getRandomMilestonesAndAwards(gameOptions, requiredQty, LIMITED_SYNERGY);
      break;
    case RandomMAOptionType.UNLIMITED:
      drawnMilestonesAndAwards = getRandomMilestonesAndAwards(gameOptions, requiredQty, UNLIMITED_SYNERGY);
      break;
    }

    return drawnMilestonesAndAwards;
  }

  // Selects |numberMARequested| milestones and |numberMARequested| awards from all available awards and milestones (optionally including
  // Venusian.) It does this by following these rules:
  // 1) No pair with synergy above |maxSynergyAllowed|.
  // 2) Total synergy is |totalSynergyAllowed| or below.
  // 3) Limited a number of pair with synergy at |highThreshold| or above to |numberOfHighAllowed| or below.
  function getRandomMilestonesAndAwards(gameOptions: GameOptions,
    numberMARequested: number,
    constraints: Constraints,
    attempt: number = 1): IDrawnMilestonesAndAwards {
    // 5 is a fine number of attempts. A sample of 100,000 runs showed that this algorithm
    // didn't get past 3.
    // https://github.com/bafolts/terraforming-mars/pull/1637#issuecomment-711411034
    const maxAttempts = 5;
    if (attempt > maxAttempts) {
      throw new Error('No limited synergy milestones and awards set was generated after ' + maxAttempts + ' attempts. Please try again.');
    }

    const toName = (e: { name: string }) => e.name;

    const candidateMilestones = [...ORIGINAL_MILESTONES, ...ELYSIUM_MILESTONES, ...HELLAS_MILESTONES].map(toName);
    const candidateAwards = [...ORIGINAL_AWARDS, ...ELYSIUM_AWARDS, ...HELLAS_AWARDS].map(toName);

    if (gameOptions.venusNextExtension && gameOptions.includeVenusMA) {
      candidateMilestones.push(...VENUS_MILESTONES.map(toName));
      candidateAwards.push(...VENUS_AWARDS.map(toName));
    }
    if (gameOptions.aresExtension) {
      candidateMilestones.push(...ARES_MILESTONES.map(toName));
      candidateAwards.push(...ARES_AWARDS.map(toName));
    }
    if (gameOptions.moonExpansion) {
      candidateMilestones.push(...MOON_MILESTONES.map(toName));
      candidateAwards.push(...MOON_AWARDS.map(toName));
    }
    if (gameOptions.trajectoryExtension) {
      candidateMilestones.push(...TRAJECTORY_MILESTONES.map(toName));
      candidateAwards.push(...TRAJECTORY_AWARDS.map(toName));

      if (gameOptions.venusNextExtension) {
        candidateMilestones.push(...TRAJECTORY_VENUS_MILESTONES.map(toName));
      }
    }
    const shuffledMilestones = shuffle(candidateMilestones);
    const shuffledAwards = shuffle(candidateAwards);

    const accum = new Accumulator(constraints);

    // Keep adding milestones or awards until there are as many as requested
    while (accum.milestones.length + accum.awards.length < numberMARequested * 2) {
      // If there is enough award, add a milestone. And vice versa. If still need both, flip a coin to decide which to add.
      if (accum.awards.length === numberMARequested || (accum.milestones.length !== numberMARequested && Math.round(Math.random()))) {
        const newMilestone = shuffledMilestones.splice(0, 1)[0];
        // If not enough milestone are left to satisfy the constraints, restart the function with a recursive call.
        if (newMilestone === undefined) {
          return getRandomMilestonesAndAwards(gameOptions, numberMARequested, constraints, attempt + 1);
        }
        accum.add(newMilestone, true);
      } else {
        const newAward = shuffledAwards.splice(0, 1)[0];
        // If not enough awards are left to satisfy the constraints, restart the function with a recursive call.
        if (newAward === undefined) {
          return getRandomMilestonesAndAwards(gameOptions, numberMARequested, constraints, attempt + 1);
        }
        accum.add(newAward, false);
      }
    }

    if (!verifySynergyRules(accum.milestones.concat(accum.awards), constraints)) {
      throw new Error('The randomized milestones and awards set does not satisfy the given synergy rules.');
    }

    return {
      milestones: accum.milestones.map((name) => Milestones.getByName(name)),
      awards: accum.awards.map((name) => Awards.getByName(name)),
    };
  }

  // Verify whether a given array of |milestoneAwardArray| satisfies the following these rules:
  // 1) No pair with synergy above |maxSynergyAllowed|.
  // 2) Total synergy is |totalSynergyAllowed| or below.
  // 3) Limited a number of pair with synergy at |highThreshold| or above to |numberOfHighAllowed| or below.
  export function verifySynergyRules(
    mas: Array<string>,
    constraints: Constraints): boolean {
    let max = 0;
    let totalSynergy = 0;
    let numberOfHigh = 0;
    for (let i = 0; i < mas.length - 1; i++) {
      for (let j = i + 1; j < mas.length; j++) {
        const synergy = Synergies.map.get(mas[i], mas[j]);
        max = Math.max(synergy, max);
        totalSynergy += synergy;
        if (synergy >= constraints.highThreshold) numberOfHigh++;
      }
    }
    return max <= constraints.maxSynergyAllowed &&
      totalSynergy <= constraints.totalSynergyAllowed &&
      numberOfHigh <= constraints.numberOfHighAllowed;
  }

  class Accumulator {
    milestones: Array<string> = [];
    awards: Array<string> = [];

    private accumulatedHighCount: number = 0;
    private accumulatedTotalSynergy: number = 0;

    constructor(private constraints: Constraints) {
    }

    // Conditionally add a milestone or award when it doesn't
    // violate synergy constraints.
    //
    // |ma| is the milestone or award, |milestone| is true when
    // |ma| represents a milestone and false when it represents
    // an award.
    //
    // Returns true when successful, false otherwise.
    //
    add(candidate: string, milestone: boolean): boolean {
      let totalSynergy = this.accumulatedTotalSynergy;
      let highCount = this.accumulatedHighCount;
      let max = 0;

      // Find the maximum synergy of this new item compared to the others
      this.milestones.concat(this.awards).forEach((ma) => {
        const synergy = Synergies.map.get(ma, candidate);
        totalSynergy += synergy;
        if (synergy >= this.constraints.highThreshold) {
          highCount++;
        }
        max = Math.max(synergy, max);
      });
      // Check whether the addition violates any rule.
      if (max <= this.constraints.maxSynergyAllowed &&
        highCount <= this.constraints.numberOfHighAllowed &&
        totalSynergy <= this.constraints.totalSynergyAllowed) {
        if (milestone) {
          this.milestones.push(candidate);
        } else {
          this.awards.push(candidate);
        }
        // Update the stats
        this.accumulatedHighCount = highCount;
        this.accumulatedTotalSynergy = totalSynergy;
        return true;
      } else {
        return false;
      }
    }
  }
}
