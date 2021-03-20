import {Request} from "express";

export class LogoutUser {
  execute(req:Request) {
    req.session.destroy((err) => {
      if (err) throw err;
    });
  }
}
