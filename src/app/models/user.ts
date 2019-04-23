import {Chat} from './chat';

export class User {
  id: number;
  username: string;
  // password: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
  chats: Chat[];
}
