import User from '../model/User';
import { AbstractUserRepository } from './AbstractUserRepository';
import { UserEntity } from '../User';

class UserRepository extends AbstractUserRepository {
  async getUserById(id: number): Promise<UserEntity> {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    return new UserEntity(user.userId, user.username, user.email, user.password);
  }

  async updateUserPassword(id: number, username: string, password: string): Promise<UserEntity> {
    const user = await User.update({
      username,
      password,
    }, {
      where: {
        id,
      },
    });
    return new UserEntity(user.userId, user.username, user.email, user.password);
  }

  async signUpUser(email: string, username: string, password: string): Promise<UserEntity | undefined> {
    const [, user] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        password,
        username,
      },
    });

    return new UserEntity(user.userId, user.username, user.email, user.password);
  }

  async signIn(email: string, password: string): Promise<UserEntity> {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    return new UserEntity(user.userId, user.username, user.email, user.password);
  }
}

export default new UserRepository();
