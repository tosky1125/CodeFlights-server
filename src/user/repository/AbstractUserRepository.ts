import {UserEntity} from '../User';

export abstract class AbstractUserRepository {
  abstract getUserById(id: number): Promise<UserEntity>;

  abstract updateUserPassword(id: number, username: string, password: string): Promise<UserEntity>;

  abstract signUpUser(email: string, username: string, password: string): Promise<any>;

  abstract signIn(email: string, password: string): Promise<UserEntity>;
}
