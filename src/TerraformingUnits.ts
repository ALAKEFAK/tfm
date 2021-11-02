// A representation of a value associated with terraforming

// import {Player} from './Player';

// Units represents any value of each standard unit.
// Could be positive or negative, depending on how it's used.
export interface TerraformingUnits {
  temperature: number;
  oxygen: number;
  ocean: number;
  venus: number;
  tr: number;
}

export namespace TerraformingUnits {

  export const EMPTY: Readonly<TerraformingUnits> = {
    get temperature() {
      return 0;
    },
    get oxygen() {
      return 0;
    },
    get ocean() {
      return 0;
    },
    get venus() {
      return 0;
    },
    get tr() {
      return 0;
    },
  };

  // Converts partial units to a full Units, allowing code to use a Units stricture,
  // reducing the need to check for undefined everywhere.
  export function of(partialUnits: Partial<TerraformingUnits>): TerraformingUnits {
    return {
      temperature: partialUnits.temperature === undefined ? 0 : partialUnits.temperature,
      oxygen: partialUnits.oxygen === undefined ? 0 : partialUnits.oxygen,
      ocean: partialUnits.ocean === undefined ? 0 : partialUnits.ocean,
      venus: partialUnits.venus === undefined ? 0 : partialUnits.venus,
      tr: partialUnits.tr === undefined ? 0 : partialUnits.tr,
    };
  }
}
