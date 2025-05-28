import data from "../data/diagnoses";
import { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[] => {
	return data;
};

const getDiagnosisByCode = (code: string): Diagnosis => {
	const diagnosis = data.find((diagnosis) => diagnosis.code === code);
	if (!diagnosis) {
		throw new Error("Diagnosis Not Found");
	}
	return diagnosis;
};

export const diagnosisService = {
	getAllDiagnoses,
	getDiagnosisByCode,
};
