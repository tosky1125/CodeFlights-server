import {AbstractUserRepository} from "../repository/AbstractUserRepository";
import {UserEntity} from "../User";
import {Request} from "express";

export class GetUser {

  constructor(
    private readonly userRepository : AbstractUserRepository
  ) {
  }

  async execute(req : Request): Promise<UserEntity> {
    const { session } = req;
    if(!session.userId){
      throw new Error('UserId Expected');
    }
    const user = await this.userRepository.getUserById(session.userId);

    if(!user){
      throw new Error('User Not Existed');
    }

    return user;
  }
}
