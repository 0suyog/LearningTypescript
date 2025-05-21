import express from "express";
import { diagnosisService } from "../services/diagnosesService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
    res.send(diagnosisService.getAllDiagnoses());
});

diagnosisRouter.get("/:code", (_req, res) => {
    try {
        const code = _req.params.code;
        const diagnosis = diagnosisService.getDiagnosisByCode(code);
        res.json(diagnosis);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).send("Diagnosis not Found");
        }
    }
});

export default diagnosisRouter;
