
import express, { Request, Response } from "express";
import notFound from "./middleware/notFound";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(globalErrorHandler);


export default app;
