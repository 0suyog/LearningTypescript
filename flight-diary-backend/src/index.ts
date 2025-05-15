import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diaries";
import { errorHandler } from "./middlewares";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.use("/api/diaries", diaryRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
