import { z } from "zod";

// type guards

import {
	Diagnosis,
	Gender,
	HealthCheckRating,
	NewPatient,
	NewEntry,
	SickLeaveType,
	DischargeType,
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

const isDate = (date: unknown): boolean => {
	return isString(date) && Boolean(Date.parse(date));
};

const isHelthCheckRating = (rating: unknown): rating is HealthCheckRating => {
	return (
		isNumber(rating) &&
		Object.values(HealthCheckRating)
			.map((r) => r.toString())
			.includes(rating.toString())
	);
};

const isDiagnosisCodes = (codes: unknown): codes is Diagnosis["code"][] => {
	if (codes instanceof Array) {
		return codes.every((code) => typeof code === "string");
	}
	return false;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeaveType => {
	if (
		typeof sickLeave === "object" &&
		sickLeave !== null &&
		"startDate" in sickLeave &&
		"endDate" in sickLeave
	) {
		if (isDate(sickLeave.endDate) && isDate(sickLeave.startDate)) return true;
	}
	return false;
};

const isDischarge = (discharge: unknown): discharge is DischargeType => {
	if (
		typeof discharge === "object" &&
		discharge !== null &&
		"date" in discharge &&
		"criteria" in discharge
	) {
		if (isDate(discharge.date) && isString(discharge.criteria)) return true;
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
	if (isHelthCheckRating(rating)) return rating;
	throw new Error("Invalid rating");
};

const parseDischarge = (discharge: unknown): DischargeType => {
	if (isDischarge(discharge)) {
		return discharge;
	}
	throw new Error("Invalid discharge");
};

const parseSickLeave = (sickLeave: unknown): SickLeaveType => {
	if (isSickLeave(sickLeave)) {
		return sickLeave;
	}
	throw new Error("Invalid Sick Leave");
};

const parseEmployerName = (employeeName: unknown): string => {
	if (isString(employeeName)) {
		return employeeName;
	}

	throw new Error("Invalid Employee name");
};

// * new entry parser

export const toNewEntry = (entryDetail: unknown): NewEntry => {
	if (typeof entryDetail !== "object" || entryDetail === null) {
		throw new Error("Invalid Input");
	}
	const details = entryDetail as Record<string, unknown>;
	if (
		"date" in details &&
		"specialist" in details &&
		"diagnosisCodes" in details &&
		"description" in details &&
		"type" in details &&
		("discharge" in details ||
			("sickLeave" in details && "employerName" in details) ||
			"healthCheckRating" in details)
	) {
		if (
			details.type !== "Hospital" &&
			details.type !== "HealthCheck" &&
			details.type !== "OccupationalHealthCare"
		) {
			throw new Error("Invalid Entry Type");
		}
		const newEntry = {
			date: parseDate(details.date),
			specialist: parseSpecialist(details.specialist),
			diagnosisCodes: parseDiagnosisCodes(details.diagnosisCodes),
			description: parseDescription(details.description),
		};
		switch (details.type) {
			case "Hospital":
				return {
					...newEntry,
					type: details.type,
					discharge: parseDischarge(details.discharge),
				};
			case "HealthCheck":
				return {
					...newEntry,
					type: details.type,
					healthCheckRating: parseHealthCheckRating(details.healthCheckRating),
				};
			case "OccupationalHealthCare":
				return {
					...newEntry,
					type: details.type,
					sickLeave: parseSickLeave(details.sickLeave),
					employerName: parseEmployerName(details.employerName),
				};
		}
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
