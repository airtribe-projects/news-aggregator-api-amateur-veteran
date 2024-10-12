import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/requests';

function tryCatchWrapper(f: (req: AuthenticatedRequest, res: Response) => Promise<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
      console.info('controller', f.name);
  
      try {
        const authReq = req as AuthenticatedRequest;
        const resp = await f(authReq, res);
        return res.send(resp);
      } catch (err) {
        console.error(`Error in controller ${f.name}: ${JSON.stringify(err)}`);
        return next(err);
      }
    };
}

export { tryCatchWrapper };