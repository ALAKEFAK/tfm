import {GameOptionsModel} from './GameOptionsModel';
import {ColonyModel} from './ColonyModel';
import {Color} from '../Color';
import {TurmoilModel} from './TurmoilModel';
import {ClaimedMilestoneModel} from './ClaimedMilestoneModel';
import {FundedAwardModel} from './FundedAwardModel';
import {Phase} from '../Phase';
import {SpaceModel} from './SpaceModel';
import {IAresData} from '../ares/IAresData';
import {MoonModel} from './MoonModel';
import {PartyName} from '../turmoil/parties/PartyName';

// Common data about a game not assocaited with a player (eg the temperature.)
export interface GameModel {
  aresData: IAresData | undefined;
  awards: Array<FundedAwardModel>;
  colonies: Array<ColonyModel>;
  deckSize: number;
  gameAge: number;
  gameOptions: GameOptionsModel;
  generation: number;
  isSoloModeWin: boolean;
  lastSoloGeneration: number,
  milestones: Array<ClaimedMilestoneModel>;
  moon: MoonModel | undefined;
  oceanRecord: Array<number>;
  oceans: number;
  oxygenLevel: number;
  oxygenRecord: Array<number>;
  passedPlayers: Array<Color>;
  phase: Phase;
  rulingPartiesRecord: Array<PartyName>
  spaces: Array<SpaceModel>;
  spectatorId?: string;
  temperature: number;
  tempRecord: Array<number>;
  isTerraformed: boolean;
  turmoil: TurmoilModel | undefined;
  undoCount: number;
  venusRecord: Array<number>;
  venusScaleLevel: number;
}
