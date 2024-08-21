import {Colony} from './Colony';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class PlutoRebalanced extends Colony {
    public name = ColonyName.PLUTO_REBALANCED;
    public description = 'Cards';
    public buildType = ColonyBenefit.DRAW_CARDS;
    public buildQuantity = [3, 3, 3];
    public tradeType = ColonyBenefit.DRAW_CARDS;
    public tradeQuantity = [0, 1, 1, 2, 2, 3, 3];
    public colonyBonusType = ColonyBenefit.DRAW_CARDS_AND_DISCARD_ONE;
}
