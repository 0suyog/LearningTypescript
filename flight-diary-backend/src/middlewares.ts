import { Response, Request, NextFunction } from "express";
import { ServerError } from "./utils";

export const errorHandler = (
    err: Error | ServerError,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = {
        message: `Something Went Wrong ${err.message}`,
        additionalData: { body: _req.body as unknown },
    };
    const status = err instanceof ServerError ? err.status || 500 : 500;
    res.status(status).json(response);
    next(err);
};
