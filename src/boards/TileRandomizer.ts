import {Random} from '../Random';
import {ShuffleTileOptionType} from './ShuffleTileOptionType';
import {SpaceName} from '../SpaceName';
import {SpaceBonus} from '../SpaceBonus';
import {TILES_PER_ROW} from '../constants';

export class TileRandomizer {
  private rng: Random;
  private randomBoardOption: ShuffleTileOptionType = ShuffleTileOptionType.NONE;
  private adjacentSpaceMap: Map<number, Array<number>> = new Map();
  private mustBeLandSpaces: Array<SpaceName> = [];
  private unshufflableSpaces: Array<number> = [];
  private minOceanValue: number = 2;

  constructor(randomBoardOption: ShuffleTileOptionType, rng: Random) {
    this.rng = rng;
    this.randomBoardOption = randomBoardOption;
    this.mustBeLandSpaces = [];
    this.createAdjacentSpaceMap();
  }

  setMustBeLandSpaces(...lands: Array<SpaceName>) {
    this.mustBeLandSpaces = lands;
  }

  addUnshufflableSpace(idx: number) {
    this.unshufflableSpaces.push(idx);
  }

  // Shuffle the ocean spaces and bonus spaces. But protect the land spaces supplied by
  // |lands| so that those IDs most definitely have land spaces.
  randomizeOceans(oceans: Array<boolean>): Array<boolean> {
    // Not random
    if (this.randomBoardOption === ShuffleTileOptionType.NONE) {
      return oceans;
    }
    // Always shuffled "full random" if no treatment afterwards
    this.shuffleArray(oceans);
    // Limited Random
    if (this.randomBoardOption === ShuffleTileOptionType.LIMITED_RANDOM) {
      // Distribution for oceans: 10% clumping, 30% mid, 60% low clumping
      let ocean_connection_value: number = this.rng.next();
      if (ocean_connection_value >= 0.9) {
        ocean_connection_value = 5;
      } else if (ocean_connection_value >= 0.6) {
        ocean_connection_value = 4;
      } else {
        ocean_connection_value = 3;
      }
      const idOrder = Array.from(Array(oceans.length).keys());
      this.shuffleArray(idOrder);
      idOrder.forEach((i) => {
        // Only look at oceans
        if (!oceans[i]) return;
        // Ignore unshufflable spaces
        if (this.unshufflableSpaces.includes(i)) return;
        // Find a suitable spot to swap places with
        let landWithNotManyOceans: number | undefined = 0;
        while (true) {
          const j = this.rng.nextInt(oceans.length);
          if (oceans[j]) continue;
          const adjOceanPerc: number | undefined = this.getAdjacentOceanInfo(j, oceans, true);
          if ((adjOceanPerc !== undefined) && (adjOceanPerc <= (ocean_connection_value / 6))) {
            landWithNotManyOceans = j;
            break;
          }
        }
        [oceans[landWithNotManyOceans], oceans[i]] = [oceans[i], oceans[landWithNotManyOceans]];
      });
    }
    let safety = 0;
    // Make sure that the must be land spaces are land
    while (safety < 1000) {
      let satisfy = true;
      this.mustBeLandSpaces.forEach((land) => {
        // Why -3?
        // Because Ids 1 and 2 are GC and Phobos
        const land_id = Number(land) - 3;
        while (oceans[land_id]) {
          satisfy = false;
          const idx = Math.floor(this.rng.nextInt(oceans.length));
          [oceans[land_id], oceans[idx]] = [oceans[idx], oceans[land_id]];
        }
      });
      if (satisfy) break;
      safety++;
    }
    if (safety >= 1000) {
      throw new Error('infinite loop detected');
    }

    return oceans;
  }

  // Shuffle the bonus spaces.
  randomizeBonuses(bonuses: Array<Array<SpaceBonus>>, oceans: Array<boolean>): Array<Array<SpaceBonus>> {
    // Not random
    if (this.randomBoardOption === ShuffleTileOptionType.NONE) {
      return bonuses;
    }
    // Always shuffled "full random" if no treatment afterwards
    this.shuffleArray(bonuses);
    // Limited Random
    if (this.randomBoardOption === ShuffleTileOptionType.LIMITED_RANDOM) {
      const idOrder = Array.from(Array(bonuses.length).keys());
      this.shuffleArray(idOrder);
      idOrder.forEach((i) => {
        if (this.unshufflableSpaces.includes(i)) return;
        if (!(bonuses[i].includes(SpaceBonus.PLANT))) return;
        const adjacentPlantBonusSpaceCount = this.getNumAdjacentPlantBonusSpaces(i, bonuses);
        if (adjacentPlantBonusSpaceCount === undefined) return;
        if (adjacentPlantBonusSpaceCount >= 2) return;
        if (adjacentPlantBonusSpaceCount === 1 && this.rng.next() < 0.7) return;
        if (adjacentPlantBonusSpaceCount === 0 && this.rng.next() < 0.1) return;
        const landWithTheMostAdjacentPlantBonus = this.getLandWithTheMostAdjacentPlantBonus(bonuses);
        if (landWithTheMostAdjacentPlantBonus === undefined) return;
        [bonuses[landWithTheMostAdjacentPlantBonus], bonuses[i]] = [bonuses[i], bonuses[landWithTheMostAdjacentPlantBonus]];
      });
      // Check oceans to have minimum value of 2
      for (let i = 0; i < oceans.length; i++) {
        if (this.unshufflableSpaces.includes(i)) continue;
        // Only look at oceans
        if (!oceans[i]) continue;
        let oceanValue: number;
        while (true) {
          oceanValue = this.getHexValue(bonuses[i], i, oceans);
          if (oceanValue >= this.minOceanValue) break;
          const j = this.rng.nextInt(oceans.length);
          if (oceans[j]) continue;
          [bonuses[j], bonuses[i]] = [bonuses[i], bonuses[j]];
        }
      }
    }
    return bonuses;
  }

  // create adjacentSpaceMap contain connection edge for each id
  //   0 1 2
  //  3 4 5 6
  //   7 8 9
  // adjacentSpaceMap[3]=[0,4,7]
  // adjacentSpaceMap[1]=[0,2,4,5]
  // adjacentSpaceMap[4]=[0,1,3,5,7,8]
  createAdjacentSpaceMap() {
    let idx = 0;
    for (let row = 0; row < TILES_PER_ROW.length; row++) {
      const tilesInThisRow = TILES_PER_ROW[row];
      for (let i = 0; i < tilesInThisRow; i++) {
        const adjIds: Array<number> = [];
        if (row > 0) {
          if (tilesInThisRow === TILES_PER_ROW[row - 1] + 1) {
            //   0 1 2
            //* 3 4 5 6
            if (i > 0) adjIds.push(idx - tilesInThisRow); // upleft for 4,5,6
            if (i < tilesInThisRow - 1) adjIds.push(idx - TILES_PER_ROW[row - 1]); // upright for 3,4,5
          }
          if (tilesInThisRow === TILES_PER_ROW[row - 1] - 1) {
            //  3 4 5 6
            //*  7 8 9
            adjIds.push(idx - TILES_PER_ROW[row - 1]); // upleft for 7,8,9
            adjIds.push(idx - tilesInThisRow); // upright for 7,8,9
          }
        }
        if (i > 0) adjIds.push(idx - 1); // left
        if (i + 1 < tilesInThisRow) adjIds.push(idx + 1); // right
        if (row + 1 < TILES_PER_ROW.length) {
          if (tilesInThisRow === TILES_PER_ROW[row + 1] + 1) {
            //* 3 4 5 6
            //   7 8 9
            if (i > 0) adjIds.push(idx + TILES_PER_ROW[row + 1]); // downleft for 4,5,6
            if (i < tilesInThisRow - 1) adjIds.push(idx + tilesInThisRow); // downright for 3,4,5
          }
          if (tilesInThisRow === TILES_PER_ROW[row + 1] - 1) {
            //*  0 1 2
            //  3 4 5 6
            adjIds.push(idx + tilesInThisRow); // downleft for 0,1,2
            adjIds.push(idx + TILES_PER_ROW[row + 1]); // downright for 0,1,2
          }
        }
        this.adjacentSpaceMap.set(idx, adjIds);
        idx++;
      }
    }
  }

  // How much value does a specific tile have?
  getHexValue(b: SpaceBonus[], i: number, oceans: Array<boolean>): number {
    const steelVal = 2;
    const tiVal = 3;
    const plantVal = 2;
    const heatVal = 1;
    const microbeVal = 2;
    const animalVal = 3;
    const cardVal = 4;
    let hexValue = 0;

    if (b.includes(SpaceBonus.POWER)) {
      if (b.length === 2) hexValue += 3;
      if (b.length === 3) hexValue += 9;
    } else {
      for (let j = 0; j < b.length; j++) {
        switch (b[j]) {
        case SpaceBonus.STEEL:
          hexValue += steelVal;
          break;
        case SpaceBonus.TITANIUM:
          hexValue += tiVal;
          break;
        case SpaceBonus.PLANT:
          hexValue += plantVal;
          break;
        case SpaceBonus.HEAT:
          hexValue += heatVal;
          break;
        case SpaceBonus.MICROBE:
          hexValue += microbeVal;
          break;
        case SpaceBonus.ANIMAL:
          hexValue += animalVal;
          break;
        case SpaceBonus.DRAW_CARD:
          hexValue += cardVal;
          break;
        case SpaceBonus.OCEAN:
          hexValue += 8;
          break;
        case SpaceBonus.TEMPERATURE:
          hexValue += 6;
          break;
        default:
          hexValue += 0;
        }
      }
    }

    const adjOceans = this.getAdjacentOceanInfo(i, oceans);

    if (typeof(adjOceans) !== 'undefined' && adjOceans !== null) {
      hexValue += 2 * adjOceans;
    }
    return hexValue;
  }

  // Calculate the upper bound for a city surrounded by greeneries for each tile
  calcHexBlockValues(bonuses: Array<Array<SpaceBonus>>, oceans: Array<boolean>): number[] | undefined {
    if (bonuses.length !== oceans.length) return undefined;
    const hexVals = [];
    for (let i = 0; i < oceans.length; i++) {
      const adjIds = this.adjacentSpaceMap.get(i);
      let bonusTotal = 0;
      if (adjIds === undefined) return undefined;
      bonusTotal += this.getHexValue(bonuses[i], i, oceans);
      hexVals.push(bonusTotal);
    }
    const levelTwoHexVals = [];
    for (let i = 0; i < oceans.length; i++) {
      const adjIds = this.adjacentSpaceMap.get(i);
      let bonusTotal = hexVals[i];
      if (adjIds === undefined) return undefined;
      if (!oceans[i]) {
        for (let j = 0; j < adjIds.length; j++) {
          if (!oceans[adjIds[j]]) {
            bonusTotal += hexVals[adjIds[j]];
          }
        }
      }
      levelTwoHexVals.push(bonusTotal);
    }
    return levelTwoHexVals;
  }

  // calculate how many tile adjacent to i has plant
  getNumAdjacentPlantBonusSpaces(i: number, bonuses: Array<Array<SpaceBonus>>): number | undefined {
    let plantDeg = 0;
    const adjIds = this.adjacentSpaceMap.get(i);
    if (adjIds === undefined) return undefined;
    adjIds.forEach((idx) => {
      if (bonuses[idx].includes(SpaceBonus.PLANT)) plantDeg++;
    });
    return plantDeg;
  }

  // find a tile without plant, and has the most adjacent plant tile
  getLandWithTheMostAdjacentPlantBonus(bonuses: Array<Array<SpaceBonus>>): number | undefined {
    let candidates: Array<number> = [];
    let curPlantDegree = -1;
    for (let i = 0; i < bonuses.length; ++i) {
      if (this.unshufflableSpaces.includes(i)) continue;
      if (bonuses[i].includes(SpaceBonus.PLANT)) continue;
      const plantDegree = this.getNumAdjacentPlantBonusSpaces(i, bonuses);
      if (plantDegree === undefined) continue;
      if (plantDegree > curPlantDegree) {
        curPlantDegree = plantDegree;
        candidates = [i];
      } else if (plantDegree === curPlantDegree) {
        candidates.push(i);
      }
    }
    if (candidates.length === 0) return undefined;
    const idx = Math.floor(this.rng.next() * candidates.length);
    return candidates[idx];
  }

  // calculate how many tile adjacent to i is ocean divided by num adj tiles
  getAdjacentOceanInfo(i: number, oceans: Array<boolean>, get_perc: boolean=false): number | undefined {
    let oceanDeg = 0;
    const adjIds = this.adjacentSpaceMap.get(i);
    if (adjIds === undefined) return undefined;
    adjIds.forEach((idx) => {
      if (oceans[idx]) oceanDeg++;
    });
    if (get_perc) return oceanDeg / adjIds.length;
    return oceanDeg;
  }

  // find a land tile, and has the most adjacent ocean
  getLandWithTheMostOceanAdjacent(oceans: Array<boolean>): number | undefined {
    let candidates: Array<number> = [];
    let curOceanDegree = -1;
    for (let i = 0; i < oceans.length; ++i) {
      if (this.unshufflableSpaces.includes(i)) continue;
      if (oceans[i]) continue;
      const oceanDegree = this.getAdjacentOceanInfo(i, oceans);
      if (oceanDegree === undefined) continue;
      if (oceanDegree > curOceanDegree) {
        curOceanDegree = oceanDegree;
        candidates = [i];
      } else if (oceanDegree === curOceanDegree) {
        candidates.push(i);
      }
    }
    if (candidates.length === 0) return undefined;
    const idx = Math.floor(this.rng.next() * candidates.length);
    return candidates[idx];
  }

  public shuffleArray(array: Array<Object>): void {
    this.unshufflableSpaces.sort((a, b) => a < b ? a : b);
    // Reverseing the indexes so the elements are pulled from the right.
    // Revering the result so elements are listed left to right.
    const spliced = this.unshufflableSpaces.reverse().map((idx) => array.splice(idx, 1)[0]).reverse();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng.next() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (let idx = 0; idx < this.unshufflableSpaces.length; idx++) {
      array.splice(this.unshufflableSpaces[idx], 0, spliced[idx]);
    }
  }
}
