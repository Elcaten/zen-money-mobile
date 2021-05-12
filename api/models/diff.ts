import {UserAccount} from './account';
import {Company} from './company';
import {Instrument} from './instrument';
import {Tag} from './tag';
import {Transaction} from './transaction';
import {User} from './user';

export interface Diff {
  currentClientTimestamp: number; //Unix timestamp
  serverTimestamp: number; //Unix timestamp

  instrument?: Instrument[];
  company?: Company[];
  user?: User[];
  account?: UserAccount[];
  tag?: Tag[];
  // merchant:       [Merchant]?
  // budget:         [Budget]?
  // reminder:       [Reminder]?
  // reminderMarker: [ReminderMarker]?
  transaction?: Transaction[];

  // deletion: [
  //     {
  //         id:     String -> Object.id
  //         object: String -> Object.class
  //         stamp:  Int
  //         user:   Int
  //     }
  // ]?
}
