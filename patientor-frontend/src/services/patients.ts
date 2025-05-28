import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const getById = async (id: string): Promise<Patient> => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
	return data;
};

const addPatientEntry = async (
	id: string,
	newEntry: NewEntry
): Promise<Entry> => {
	const { data } = await axios.post(
		`${apiBaseUrl}/patients/${id}/entry`,
		newEntry
	);
	return data;
};

export default {
	getAll,
	create,
	getById,
	addPatientEntry,
};
