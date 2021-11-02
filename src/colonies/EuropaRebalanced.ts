import {Colony, ShouldIncreaseTrack} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class EuropaRebalanced extends Colony {
    public name = ColonyName.EUROPA_REBALANCED;
    public description = 'Production';
    public buildType = ColonyBenefit.PLACE_OCEAN_TILE;
    public tradeType = ColonyBenefit.GAIN_PRODUCTION;
    public tradeQuantity = [1, 1, 1, 1, 1, 2, 2];
    public tradeResource = [
      Resources.MEGACREDITS, Resources.MEGACREDITS,
      Resources.ENERGY, Resources.ENERGY, Resources.ENERGY,
      Resources.ENERGY, Resources.ENERGY,
    ];
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusQuantity = 2;
    public colonyBonusResource = Resources.MEGACREDITS;
    public shouldIncreaseTrack = ShouldIncreaseTrack.ASK;
}
