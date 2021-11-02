import {IAward} from './../IAward';

export class Unifier implements IAward {
    public name: string = 'Unifier';
    public description: string = 'All players tie for 1st for this award'
    public getScore(): number {
      return 1;
    }
}
