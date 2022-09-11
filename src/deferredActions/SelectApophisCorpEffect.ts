import {Player} from '../Player';
import {DeferredAction, Priority} from './DeferredAction';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {MAX_TEMPERATURE, MAX_VENUS_SCALE} from '../constants';
import {LogHelper} from '../LogHelper';

export class SelectApophisCorpEffect implements DeferredAction {
  public priority = Priority.DEFAULT;

  constructor(
    public player: Player,
    public title: string = 'Select Apophis Corporation Effect',
  ) {
  }

  public execute() {
    const tempCanBeRaised = this.player.game.getTemperature() < MAX_TEMPERATURE;
    const venusCanBeRaised = this.player.game.gameOptions.venusNextExtension && this.player.game.getVenusScaleLevel() < MAX_VENUS_SCALE;
    const paramsCanBeRaised = tempCanBeRaised || venusCanBeRaised;

    if (this.player.corporationCard === undefined || this.player.corporationCard.resourceCount === undefined) return undefined;

    const hasAsteroids = this.player.corporationCard.resourceCount > 0;

    const raiseParameter = new SelectOption('Remove 1 asteroid on this card to increase temperature or Venus 1 step', 'Remove asteroid', () => {
      if (this.player.corporationCard === undefined || this.player.corporationCard.resourceCount === undefined) return undefined;
      this.player.corporationCard.resourceCount--;
      if (!tempCanBeRaised) {
        this.player.game.increaseVenusScaleLevel(this.player, 1);
        LogHelper.logVenusIncrease(this.player, 1);
      } else if (!venusCanBeRaised) {
        this.player.game.increaseTemperature(this.player, 1);
        LogHelper.logTemperatureIncrease(this.player, 1);
      } else {
        const raiseTempOption = new SelectOption('Increase temperature 1 step', 'Increase temperature', () => {
          this.player.game.increaseTemperature(this.player, 1);
          LogHelper.logTemperatureIncrease(this.player, 1);
          return undefined;
        });
        const raiseVenusOption = new SelectOption('Increase Venus 1 step', 'Increase Venus', () => {
          this.player.game.increaseVenusScaleLevel(this.player, 1);
          LogHelper.logVenusIncrease(this.player, 1);
          return undefined;
        });
        return new OrOptions(raiseTempOption, raiseVenusOption);
      }
      return undefined;
    });

    const addAsteroidToSelf = new SelectOption('Add 1 asteroid to this card', 'Add asteroid', () => {
      if (this.player.corporationCard === undefined || this.player.corporationCard.resourceCount === undefined) return undefined;
      this.player.addResourceTo(this.player.corporationCard, {log: true});
      return undefined;
    });

    if (hasAsteroids && paramsCanBeRaised) {
      return new OrOptions(raiseParameter, addAsteroidToSelf);
    } else {
      if (this.player.corporationCard === undefined || this.player.corporationCard.resourceCount === undefined) return undefined;
      this.player.addResourceTo(this.player.corporationCard, {log: true});
      return undefined;
    }
  }
}
