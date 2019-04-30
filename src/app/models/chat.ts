import {User} from './user';
import {Message} from './message';

export class Chat {
  chatId: number;
  chatName: string;
  owner: User;
  participants: User[];
  messages: Message[];
}
