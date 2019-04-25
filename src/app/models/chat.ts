import {User} from './user';

export class Chat {
  chatId: number;
  chatName: string;
  owner: User;
  participants: User[];
}
