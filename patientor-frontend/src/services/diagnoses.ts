import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getDiagnosis = async (code: string): Promise<Diagnosis> => {
	const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
	return data;
};

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
	const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
	return data;
};

const diagnosisService = { getDiagnosis, getAllDiagnoses };

export default diagnosisService;
