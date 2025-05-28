import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosisRoutes";
import patientsRouter from "./routes/patientsRoutes";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 4000;
app.use((req, _res, next) => {
	console.log("**********************");
	console.log(req.method);
	console.log(req.path);
	console.log(req.body);
	console.log("**********************");
	console.log("\n");
	next();
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);
app.get("/api/ping", (_req, res) => {
	res.send("Pong");
});
app.listen(PORT, () => {
	console.log(`Server Listening to port ${PORT}`);
});
