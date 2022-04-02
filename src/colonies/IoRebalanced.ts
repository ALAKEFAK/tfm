import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';
import {Resources} from '../Resources';

export class IoRebalanced extends Colony {
    public name = ColonyName.IO_REBALANCED;
    public description = 'Heat';
    public buildType = ColonyBenefit.RAISE_TEMPERATURE;
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [1, 2, 3, 5, 7, 9, 12];
    public tradeResource = Resources.HEAT;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 3;
    public colonyBonusResource = Resources.HEAT;
}
