import { useContext } from "react";
import { HospitalEntryType } from "../../types";
import DiagnosesContext from "../contexts/DiagnosesContext";

interface Props {
	entry: HospitalEntryType;
}

export const HospitalEntry = ({ entry }: Props) => {
	const diagnoses = useContext(DiagnosesContext);
	return (
		<div style={{ border: "3px solid green", margin: "2px" }}>
			<p>
				{entry.date}
				{entry.description}
			</p>
			{entry.diagnosisCodes?.map((code) => (
				<li key={code}>
					{code}
					{diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
				</li>
			))}
			Specialist: {entry.specialist}
		</div>
	);
};
