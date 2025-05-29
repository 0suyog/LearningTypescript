import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { PatientEntries } from "./PatientEntries";
import { EntryForm } from "./EntryForm";

export const PatientView = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [id, setId] = useState<string | undefined>();
	const [err, setErr] = useState<string>();
	const [showForm, setShowForm] = useState<boolean>(false);
	const params = useParams();
	useEffect(() => {
		setId(params.id);
	}, [params]);
	useEffect(() => {
		(async () => {
			try {
				if (typeof id === "string") {
					const p = await patients.getById(id);
					setPatient(p);
				}
			} catch (err) {
				if (axios.isAxiosError(err)) setErr(err?.response?.data);
			}
		})();
	}, [id]);
	return (
		<>
			{patient && (
				<div>
					<p>{patient.ssn}</p>
					<p>{patient.name}</p>
					<span>{patient.gender}</span>
					<Button
						onClick={() => setShowForm((showForm) => !showForm)}
						variant={!showForm ? "contained" : "outlined"}
					>
						{showForm ? "Hide Form" : "Add Entry"}
					</Button>
					{showForm && (
						<EntryForm
							patientId={patient.id}
							addEntry={(entry) => {
								setPatient({
									...patient,
									entries: [...patient.entries, entry],
								});
								setShowForm(false);
							}}
						/>
					)}
					<PatientEntries entries={patient.entries} />
				</div>
			)}
			{err && <Alert severity="error">{err}</Alert>}
		</>
	);
};
