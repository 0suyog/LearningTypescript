import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";

export const PatientView = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [id, setId] = useState<string | undefined>();
    const [err, setErr] = useState<string>();
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
                </div>
            )}
            {err && <Alert severity="error">{err}</Alert>}
        </>
    );
};
