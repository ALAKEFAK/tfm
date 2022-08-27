import {Terraformer} from './Terraformer';
import {Mayor} from './Mayor';
import {Gardener} from './Gardener';
import {Builder} from './Builder';
import {Planner} from './Planner';
import {Hoverlord} from './Hoverlord';
import {IMilestone} from './IMilestone';
import {Generalist} from './Generalist';
import {Specialist} from './Specialist';
import {Ecologist} from './Ecologist';
import {Tycoon} from './Tycoon';
import {Legend} from './Legend';
import {Diversifier} from './Diversifier';
import {Tactician} from './Tactician';
import {PolarExplorer} from './PolarExplorer';
import {Energizer} from './Energizer';
import {RimSettler} from './RimSettler';
import {Networker} from './Networker';
import {OneGiantStep} from '../moon/OneGiantStep';
import {Lunarchitect} from '../moon/Lunarchitect';
import {Astronomer} from './trajectoryMilestones/Astronomer';
import {FrontRunner} from './trajectoryMilestones/FrontRunner';
import {Irrigator} from './trajectoryMilestones/Irrigator';
import {Pioneer} from './trajectoryMilestones/Pioneer';
import {Spacefarer} from './trajectoryMilestones/Spacefarer';
import {MorningStar} from './trajectoryMilestones/MorningStar';
import {Minimalist} from './trajectoryMilestones/Minimalist';
import {Farmer} from './trajectoryMilestones/Farmer';
import {Smith} from './trajectoryMilestones/Smith';
import {Collector} from './trajectoryMilestones/Collector';
import {Setter} from './trajectoryMilestones/Setter';
import {Sapling} from './trajectoryMilestones/Sapling';
// import {Tropicalist} from './trajectoryMilestones/Tropicalist';
// import {Terran} from './trajectoryMilestones/Terran';
// import {Colonizer} from './trajectoryMilestones/Colonizer';
import {Firestarter} from './rebalancedMilestones/Firestarter';

export const ORIGINAL_MILESTONES: Array<IMilestone> = [
  new Terraformer(),
  new Mayor(),
  new Gardener(),
  new Builder(),
  new Planner(),
];

export const VENUS_MILESTONES: Array<IMilestone> = [
  new Hoverlord(),
];

export const ELYSIUM_MILESTONES: Array<IMilestone> = [
  new Generalist(),
  new Specialist(),
  new Ecologist(),
  new Tycoon(),
  new Legend(),
];

export const HELLAS_MILESTONES: Array<IMilestone> = [
  new Diversifier(),
  new Tactician(),
  new PolarExplorer(),
  new Energizer(),
  new RimSettler(),
];

export const ARES_MILESTONES: Array<IMilestone> = [
  new Networker(),
];

export const MOON_MILESTONES: Array<IMilestone> = [
  new OneGiantStep(),
  new Lunarchitect(),
];

export const TRAJECTORY_MILESTONES: Array<IMilestone> = [
  new Astronomer(),
  new FrontRunner(),
  new Irrigator(),
  new Pioneer(),
  new Spacefarer(),
  new Minimalist(),
  new Farmer(),
  new Smith(),
  new Collector(),
  new Setter(),
  new Sapling(),
  // new Tropicalist(),
  // new Terran(),
];

export const TRAJECTORY_VENUS_MILESTONES: Array<IMilestone> = [
  new MorningStar(),
];

export const TRAJECTORY_COLONIES_MILESTONES: Array<IMilestone> = [
  // new Colonizer(),
];

export const REBALANCED_MILESTONES: Array<IMilestone> = [
  new Firestarter(),
];

export const ALL_MILESTONES: Array<IMilestone> = [
  ...ORIGINAL_MILESTONES,
  ...ELYSIUM_MILESTONES,
  ...HELLAS_MILESTONES,
  ...VENUS_MILESTONES,
  ...ARES_MILESTONES,
  ...MOON_MILESTONES,
  ...TRAJECTORY_MILESTONES,
  ...TRAJECTORY_VENUS_MILESTONES,
  ...REBALANCED_MILESTONES];

export namespace Milestones {
  export const ALL = ALL_MILESTONES;

  export function getByName(name: string): IMilestone {
    const milestone = ALL_MILESTONES.find((m) => m.name === name);
    if (milestone) {
      return milestone;
    }
    throw new Error(`Milestone ${name} not found.`);
  }
}
