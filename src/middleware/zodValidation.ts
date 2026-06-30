import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
const zodValidate =
  (Schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default zodValidate;
