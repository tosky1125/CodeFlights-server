import {AbstractUserRepository} from "../repository/AbstractUserRepository";
import {Request} from "express";

export class SignUpUser {
  constructor(
    private readonly userRepository : AbstractUserRepository
  ) {
  }

  async execute(req:Request): Promise<boolean>{
    const {
      email,
      username,
      password,
    } = req.body;
    if(!email){
      throw new Error('email Expected');
    }

    if(!username){
      throw new Error('username Expected');
    }

    if(!password){
      throw new Error('password Expected');
    }

    const result = await this.userRepository.signUpUser(email, username, password);
    if(result){
      throw new Error('User Already Existed');
    }
    return true;
  }
}
