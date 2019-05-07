import {User} from './user';
import {Chat} from './chat';

enum MessageType {
  CHAT,
  JOIN,
  LEAVE
}

export class Message {
  public id: number;
  public sender: User;
  public content: string;
  public chat: Chat;
  public sendTime: Date;
  public type: MessageType;
}
