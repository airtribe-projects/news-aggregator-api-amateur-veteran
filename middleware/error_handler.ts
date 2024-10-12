import { Request, Response, NextFunction } from 'express';
import { httpErrorStatusCodes, HttpError } from '../interfaces/http_errors';

function errorHandlerCustom(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).send({ reason: err.message });
    }
    return res.status(httpErrorStatusCodes.INTERNAL_SERVER_ERROR).send({ reason: 'Internal Server Error. Please try again later' });
}

export { errorHandlerCustom };