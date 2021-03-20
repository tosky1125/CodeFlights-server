import {Response,Request, Router} from "express";
import {GetUser} from "./service/GetUser";
import UserRepository from "./repository/UserRepository";
import {UpdateUser} from "./service/UpdateUser";
import {LogoutUser} from "./service/LogoutUser";
import {SignUpUser} from "./service/SignUpUser";
import {SignInUser} from "./service/SignInUser";

class UserController {
  getRouter() : Router {
    const router = Router();
    router.post('/signup', this.signUp);
    router.post('/signin', this.signIn);
    router.post('/logout', this.logout);
    router.post('/info', this.updatePassword);
    router.get('/info', this.getUser);
    return router;
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const service = new GetUser(UserRepository);
    try {
      const user = await service.execute(req);
      res.status(200).json({
        email: user.email,
        username: user.username,
      });
    } catch (e){
      console.log(e);
      res.status(401).json({
        status: false,
      });
    }
  }

  async updatePassword(req:Request, res:Response): Promise<void> {
    const service = new UpdateUser(UserRepository);
    try {
      const result = await service.execute(req);
      res.status(202).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: false,
      });
    }
  }

  logout(req:Request, res:Response) : void {
    const service = new LogoutUser();
    try {
      service.execute(req);
      res.redirect('/');
    } catch (e){
      console.log(e);
    }
  }

  async signUp(req:Request, res:Response) :Promise<void>{
    const service = new SignUpUser(UserRepository);
    try {
      const existUser = await service.execute(req);
      if(existUser){
        res.status(200).json({
          status: true,
        });
      } else {
        res.status(409).json({
          status: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(req:Request, res:Response):Promise<void> {
    const service = new SignInUser(UserRepository);
    try {
      const user = await service.execute(req);
      if (!user) {
        res.status(401).send(JSON.stringify({
          status: false,
        }));
      } else {
        res.status(201).json(user);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
