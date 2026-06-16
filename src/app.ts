
import express, { Request, Response } from "express";
import notFound from "./middleware/notFound";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import router from "./routes";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running!");
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


app.use("/api/v1",router);



app.use(notFound);
app.use(globalErrorHandler);


export default app;
