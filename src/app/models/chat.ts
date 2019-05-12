import {User} from './user';
import {Message} from './message';
import {Playlist} from './playlist';

export class Chat {
  chatId: number;
  chatName: string;
  owner: User;
  participants: User[];
  messages: Message[];
  trackListId: string;
}
