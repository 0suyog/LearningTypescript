import { z } from "zod";
import { newPatientSchema } from "./utils";

export type UnionOmit<T, k extends string | symbol | number> = T extends unknown
	? Omit<T, k>
	: never;

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}
export type Diagnosis = {
	code: string;
	name: string;
	latin?: string;
};
export interface BaseEntry {
	id: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
	description: string;
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3,
}

export interface HealthCheckEntryType extends BaseEntry {
	healthCheckRating: HealthCheckRating;
	type: "HealthCheck";
}

export interface DischargeType {
	date: string;
	criteria: string;
}

export interface HospitalEntryType extends BaseEntry {
	type: "Hospital";
	discharge: DischargeType;
}

export interface SickLeaveType {
	startDate: string;
	endDate: string;
}

export interface OccupationalHealthCareEntryType extends BaseEntry {
	type: "OccupationalHealthcare";
	sickLeave?: SickLeaveType;
	employerName: string;
}

export type Entry =
	| HospitalEntryType
	| OccupationalHealthCareEntryType
	| HealthCheckEntryType;

export type NewEntry = UnionOmit<Entry, "id">;

export type Patient = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
};
export type NewPatient = z.infer<typeof newPatientSchema>;

export type PatientExcludingSsn = Omit<Patient, "ssn">;
