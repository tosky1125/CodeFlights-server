import {Request} from "express";
import {AbstractUserRepository} from "../repository/AbstractUserRepository";
import {UserEntity} from "../User";

export class SignInUser {
  constructor(
    private readonly userRepository : AbstractUserRepository
  ) {
  }

  async execute(req:Request):Promise<UserEntity>{
    const {
      email,
      password,
    } = req.body;
    const {
      session,
    } = req;
    if(!email){
      throw new Error('email Expected');
    }

    if(!password){
      throw new Error('password Expected');
    }

    const user = await this.userRepository.signIn(email, password);

    if(!user) {
      throw new Error('user not existed');
    }
    req.session.userId = user.id;
    return user;
  }
}
