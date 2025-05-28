import { useContext } from "react";
import { OccupationalHealthCareEntryType } from "../../types";
import DiagnosesContext from "../contexts/DiagnosesContext";

interface Props {
	entry: OccupationalHealthCareEntryType;
}

export const OccupationalHealthCareEntry = ({ entry }: Props) => {
	const diagnoses = useContext(DiagnosesContext);
	return (
		<div style={{ border: "3px solid black", margin: "2px" }}>
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
			Employed By:{entry.employerName}
			{entry.sickLeave?.startDate &&
				`Sick Leave Start: ${entry.sickLeave.startDate} </br>
                Sick Leave End: ${entry.sickLeave.endDate}
                `}
			Specialist: {entry.specialist}
		</div>
	);
};
