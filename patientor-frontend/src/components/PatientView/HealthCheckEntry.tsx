import { useContext } from "react";
import { HealthCheckEntryType } from "../../types";
import DiagnosesContext from "../contexts/DiagnosesContext";

interface Props {
	entry: HealthCheckEntryType;
}

export const HealthCheckEntry = ({ entry }: Props) => {
	const diagnoses = useContext(DiagnosesContext);
	return (
		<div style={{ border: "3px solid red", margin: "2px" }}>
			<p>
				{entry.date}
				{entry.description}
			</p>
			<ol>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code}
						{diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
					</li>
				))}
			</ol>
			Health Rating: {entry.healthCheckRating}
			Specialist: {entry.specialist}
		</div>
	);
};
