import { z } from "zod";
// type guards

import { Gender, NewPatient } from "./types";

// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const isGender = (gender: string): gender is Gender => {
//     return Object.values(Gender)
//         .map((g) => g.toString())
//         .includes(gender);
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// // parsers

// const parseName = (name: unknown): string => {
//     if (!isString(name)) {
//         throw new Error("Invalid name.");
//     }
//     return name;
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!isString(gender) || !isGender(gender)) {
//         throw new Error("Invalid Gender");
//     }
//     return gender;
// };

// const parseDateOfBirth = (dob: unknown): string => {
//     if (!isString(dob) || !isDate(dob)) {
//         throw new Error("Invalid date of birth");
//     }
//     return dob;
// };

// const parseOccupation = (occupation: unknown): string => {
//     if (!isString(occupation)) {
//         throw new Error("Invalid Occupation");
//     }
//     return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//     if (!isString(ssn)) {
//         throw new Error("Invalid Ssn");
//     }
//     return ssn;
// };

export const newPatientSchema = z.object({
    ssn: z.string(),
    name: z.string(),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
});

export const toNewPatient = (patientDetail: unknown): NewPatient => {
    // if (!patientDetail || typeof patientDetail !== "object") {
    //     throw new Error("Invalid Input.");
    // }

    // if (
    //     "occupation" in patientDetail &&
    //     "ssn" in patientDetail &&
    //     "name" in patientDetail &&
    //     "gender" in patientDetail &&
    //     "dateOfBirth" in patientDetail
    // ) {
    return newPatientSchema.parse(patientDetail);
    // const newPatientDetail: NewPatient = {
    //     ssn: parseSsn(patientDetail.ssn),
    //     name: parseName(patientDetail.name),
    //     gender: parseGender(patientDetail.gender),
    //     occupation: parseOccupation(patientDetail.occupation),
    //     dateOfBirth: parseDateOfBirth(patientDetail.dateOfBirth),
    // };
    // return newPatientDetail;
    // // }
    // throw new Error("Missing Arguments.");
};
