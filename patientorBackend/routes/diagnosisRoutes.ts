import express from "express";
import { diagnosisService } from "../services/diagnosesService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
    res.send(diagnosisService.getAllDiagnoses());
});

export default diagnosisRouter;
