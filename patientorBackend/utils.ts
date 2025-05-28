import { z } from "zod";

// type guards

import {
	Diagnosis,
	Gender,
	HealthCheckRating,
	NewPatient,
	NewEntry,
} from "./types";

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

// * type guards for entry

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
	return typeof num === "number" || num instanceof Number;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isHelthCheckRating = (rating: number): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((r) => r.toString())
		.includes(rating.toString());
};

const isDiagnosisCodes = (codes: unknown): codes is Diagnosis["code"][] => {
	if (codes instanceof Array) {
		return codes.every((code) => typeof code === "string");
	}
	return false;
};

// * Parser for Entry

const parseDate = (date: unknown): string => {
	if (isString(date) && isDate(date)) return date;
	throw new Error("Invalid date");
};

const parseSpecialist = (specialist: unknown): string => {
	if (isString(specialist)) return specialist;
	throw new Error("Invalid specialist");
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis["code"]> => {
	if (isDiagnosisCodes(codes)) return codes;
	throw new Error("Invalid codes");
};

const parseDescription = (descp: unknown): string => {
	if (isString(descp)) return descp;
	throw new Error("Invalid Description");
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (isNumber(rating) && isHelthCheckRating(rating)) return rating;
	throw new Error("Invalid rating");
};

// * new entry parser

export const toNewEntry = (entryDetail: unknown): NewEntry => {
	if (!entryDetail || typeof entryDetail !== "object") {
		throw new Error("Invalid Input");
	}

	if (
		"date" in entryDetail &&
		"specialist" in entryDetail &&
		"diagnosisCodes" in entryDetail &&
		"description" in entryDetail &&
		"healthCheckRating" in entryDetail
	) {
		const newEntry: NewEntry = {
			date: parseDate(entryDetail.date),
			specialist: parseSpecialist(entryDetail.specialist),
			diagnosisCodes: parseDiagnosisCodes(entryDetail.diagnosisCodes),
			description: parseDescription(entryDetail.description),
			healthCheckRating: parseHealthCheckRating(entryDetail.healthCheckRating),
			type: "HealthCheck",
		};
		return newEntry;
	}
	throw new Error("Inusufficient argument");
};

// parsers

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
