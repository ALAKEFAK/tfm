import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';
import {Resources} from '../Resources';

export class CeresRebalanced extends Colony {
    public name = ColonyName.CERES_REBALANCED;
    public description = 'Steel';
    public buildType = ColonyBenefit.GAIN_PRODUCTION;
    public buildResource = Resources.STEEL;
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [1, 2, 3, 4, 5, 7, 9];
    public tradeResource = Resources.STEEL;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 2;
    public colonyBonusResource = Resources.STEEL;
}
