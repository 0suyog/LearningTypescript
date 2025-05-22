import { Entry, NewEntry } from "./../types";
import patientsData from "../data/patients";
import { NewPatient, Patient, PatientExcludingSsn } from "../types";
import { v1 } from "uuid";

const getAllPatients = (): PatientExcludingSsn[] => {
    return patientsData.map((patient) => {
        return { ...patient, ssn: undefined };
    });
};

const getPatientById = (id: string): Patient => {
    const patient = patientsData.find((patient) => patient.id === id);
    if (patient) return patient;
    throw new Error("Couldnt find the patient");
};

const addPatient = (newPatientDetail: NewPatient): Patient => {
    const patient: Patient = {
        ...newPatientDetail,
        entries: [],
        id: v1(),
    };
    patientsData.push(patient);
    return patient;
};

const addPatientEntry = (id: string, newEntry: NewEntry): Entry => {
    const entry: Entry = {
        ...newEntry,
        id: v1(),
    };
    const patient = patientsData.find((patient) => patient.id === id);
    if (!patient) {
        throw new Error("Invalid Id. Patient doesnt Exist");
    }
    patient.entries.push(entry);
    return entry;
};

export const patientService = {
    getAllPatients,
    addPatient,
    getPatientById,
    addPatientEntry,
};
