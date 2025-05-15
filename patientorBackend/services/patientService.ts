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
        // ! This should bt removed
        entries: [],
        id: v1(),
    };
    patientsData.push(patient);
    return patient;
};

export const patientService = {
    getAllPatients,
    addPatient,
    getPatientById,
};
