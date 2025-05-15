import { Router } from "express";
import { patientService } from "../services/patientService";
import { z } from "zod";
import { NewPatient } from "../types";
import { newPatientSchema } from "../utils";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
    res.send(patientService.getAllPatients());
});
patientsRouter.post("/", (_req, res) => {
    try {
        const newPatientDetail: NewPatient = newPatientSchema.parse(_req.body);
        const newPatient = patientService.addPatient(newPatientDetail);
        res.send(newPatient);
    } catch (err: unknown) {
        if (err instanceof z.ZodError) {
            res.status(400).send(err.issues);
        } else if (err instanceof Error) {
            res.status(400).send(
                `Something Wrong happened Error:${err.message}`
            );
        }
        res.status(500).send("Something Wrong happened");
    }
});

patientsRouter.get("/:id", (_req, res) => {
    try {
        const id = _req.params.id;
        const patient = patientService.getPatientById(id);
        // ! Remove this after DDebugging
        console.log("######################");
        console.log("|");
        console.log(patient);
        console.log("|");
        console.log("######################");
        // ! Remove this after DDebugging

        res.json(patient);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).send(err.message);
        }
        res.status(500).send("Something Went Wrong");
    }
});

export default patientsRouter;
