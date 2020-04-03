import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BaseControler } from '../model/basecontroller';

interface IUserData {
  id: string;
  email: string;
}
export class Authentication {
  public static async authenticate(data: IUserData, res: Response): Promise<void> {
    const yearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
    const yearAhead = new Date(Date.now() + yearInMilliseconds);
    const token = await jwt.sign(data, process.env.SECRET as string, {
      expiresIn: '1y',
    });
    res.cookie('token', token, {
      httpOnly: true,
      expires: yearAhead,
    });
  }

  public static async unauthenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie('token');
    }
    BaseControler.Unathorized(res);
  }

  public static async verifyAuthenticated(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    const token = req.cookies.token;
    if (token) {
      try {
        const decriptedToken = (await jwt.verify(token, process.env.SECRET as string)) as IUserData;
        req.user = { id: decriptedToken.id, email: decriptedToken.email };
        next();
      } catch (error) {
        BaseControler.sendJson(403, res);
      }
    } else {
      return BaseControler.Unathorized(res);
    }
  }
}
