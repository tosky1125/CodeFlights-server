import {AbstractUserRepository} from "../repository/AbstractUserRepository";
import {Request} from "express";
import {UserEntity} from "../User";

export class UpdateUser {
  constructor(
    private readonly userRepository : AbstractUserRepository
  ) {
  }

  async execute(req: Request): Promise<UserEntity> {
    const { session, body } = req;
    const { username, password } = body;

    if(!session.userId){
      throw new Error('UserId Expected')
    }

    if(!username){
      throw new Error('Username Expected')
    }

    if(!password){
      throw new Error('Password Expected')
    }

    try {
      const result = await this.userRepository.updateUserPassword(session.userId, username, password);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}
