import { Router } from "express";
import { patientService } from "../services/patientService";
import { z } from "zod";
import { NewPatient } from "../types";
import { newPatientSchema, toNewEntry } from "../utils";

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
        res.json(patient);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).send(err.message);
            return;
        }
        res.status(500).send("Something Went Wrong");
    }
});

patientsRouter.post("/:id/entry", (_req, res) => {
    try {
        const id = _req.params.id;
        console.log(id);
        const newEntry = toNewEntry(_req.body);
        const entry = patientService.addPatientEntry(id, newEntry);
        console.log(entry);
        res.json(entry);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send(err.message);
            return;
        }
        res.status(500).send("Something went wrong");
    }
});

export default patientsRouter;
