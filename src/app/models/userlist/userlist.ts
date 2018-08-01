import { User } from '../user/user.model';

export interface UserList {
  total: number;
  users: User[];
}
