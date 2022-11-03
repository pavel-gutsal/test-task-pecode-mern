import { Request, Response, NextFunction } from 'express';

type ControllerMethod = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const tryCatchMiddleWare =
  (controllerMethod: ControllerMethod) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await controllerMethod(req, res, next);
      res.send(response);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
    }
  };
