import { useState, useEffect } from "react";
import {
    // BrowserRouter as Router,
    Route,
    Link,
    Routes,
} from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { PatientView } from "./components/PatientView/PatientView";
import diagnosisService from "./services/diagnoses";
import DiagnosesContext from "./components/contexts/DiagnosesContext";

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    useEffect(() => {
        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();

        const fetchAllDiagnoses = async () => {
            const diagnoses = await diagnosisService.getAllDiagnoses();
            setDiagnoses(diagnoses);
        };
        fetchAllDiagnoses();
    }, []);

    return (
        <DiagnosesContext.Provider value={diagnoses}>
            <div className="App">
                <Container>
                    <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary">
                        Home
                    </Button>
                    <Divider hidden />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PatientListPage
                                    patients={patients}
                                    setPatients={setPatients}
                                />
                            }
                        />
                        <Route path="/:id" element={<PatientView />}></Route>
                    </Routes>
                </Container>
            </div>
        </DiagnosesContext.Provider>
    );
};

export default App;
