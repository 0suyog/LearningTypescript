export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

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

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    entries: Entry[];
    ssn?: string;
    dateOfBirth?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
