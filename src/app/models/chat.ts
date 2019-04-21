import {User} from './user';

export class Chat {
  id: number;
  name: string;
  owner: User;
  participants: User[];
}
