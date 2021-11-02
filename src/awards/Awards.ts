import {Landlord} from './Landlord';
import {Banker} from './Banker';
import {Scientist} from './Scientist';
import {Thermalist} from './Thermalist';
import {Miner} from './Miner';
import {Venuphile} from './Venuphile';
import {IAward} from './IAward';
import {Industrialist} from './Industrialist';
import {Celebrity} from './Celebrity';
import {DesertSettler} from './DesertSettler';
import {EstateDealer} from './EstateDealer';
import {Benefactor} from './Benefactor';
import {Cultivator} from './Cultivator';
import {Magnate} from './Magnate';
import {SpaceBaron} from './SpaceBaron';
import {Excentric} from './Excentric';
import {Contractor} from './Contractor';
import {Entrepreneur} from './Entrepreneur';
import {FullMoon} from '../moon/FullMoon';
import {LunarMagnate} from '../moon/LunarMagnate';
import {EdgeDancer} from './trajectoryAwards/EdgeDancer';
import {Adapter} from './trajectoryAwards/Adapter';
import {Biologist} from './trajectoryAwards/Biologist';
import {Coordinator} from './trajectoryAwards/Coordinator';
import {Energetic} from './trajectoryAwards/Energetic';
import {Equatorial} from './trajectoryAwards/Equatorial';
import {Highlander} from './trajectoryAwards/Highlander';
import {UrbanPlanner} from './trajectoryAwards/UrbanPlanner';
import {Naturalist} from './trajectoryAwards/Naturalist';
import {Microeconomist} from './trajectoryAwards/Microeconomist';
import {Distributer} from './trajectoryAwards/Distributer';
// import {Originalist} from './trajectoryAwards/Originalist';
// import {Importer} from './trajectoryAwards/Importer';

export const ORIGINAL_AWARDS: Array<IAward> = [
  new Landlord(),
  new Scientist(),
  new Banker(),
  new Thermalist(),
  new Miner(),
];

export const VENUS_AWARDS: Array<IAward> = [
  new Venuphile(),
];

export const ELYSIUM_AWARDS: Array<IAward> = [
  new Celebrity(),
  new Industrialist(),
  new DesertSettler(),
  new EstateDealer(),
  new Benefactor(),
];

export const HELLAS_AWARDS: Array<IAward> = [
  new Cultivator(),
  new Magnate(),
  new SpaceBaron(),
  new Excentric(),
  new Contractor(),
];

export const ARES_AWARDS: Array<IAward> = [
  new Entrepreneur(),
];

export const MOON_AWARDS: Array<IAward> = [
  new FullMoon(),
  new LunarMagnate(),
];

export const TRAJECTORY_AWARDS: Array<IAward> = [
  new EdgeDancer(),
  new Adapter(),
  new Biologist(),
  new Coordinator(),
  new Energetic(),
  new Equatorial(),
  new Highlander(),
  new UrbanPlanner(),
  new Naturalist(),
  new Microeconomist(),
  new Distributer(),
  // new Originalist(),
];

export const TRAJECTORY_COLONIES_AWARDS: Array<IAward> = [
  // new Importer(),
];

export const ALL_AWARDS: Array<IAward> = [
  ...ORIGINAL_AWARDS,
  ...ELYSIUM_AWARDS,
  ...HELLAS_AWARDS,
  ...VENUS_AWARDS,
  ...ARES_AWARDS,
  ...MOON_AWARDS,
  ...TRAJECTORY_AWARDS,
  ...TRAJECTORY_COLONIES_AWARDS];

export namespace Awards {
  export const ALL = ALL_AWARDS;

  export function getByName(name: string): IAward {
    const award = ALL_AWARDS.find((a) => a.name === name);
    if (award) {
      return award;
    }
    throw new Error(`Award ${name} not found.`);
  }
}
