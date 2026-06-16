import { Request, Response } from "express";
import { status } from "../utils/status";
class NotFoundError extends Error {
  constructor(path: string) {
    super(`Not Found - ${path}`);
    this.name = "NotFoundError";
  }
}

const notFound = (req: Request, res: Response) => {
  const error = new NotFoundError(req.originalUrl);

  res.status(status.NOT_FOUND).json({
    success: false,
    message: error.message,
    errorMessage: [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ],
  });
};

export default notFound;
