import { Entry } from "../../types";
import { EntryDetail } from "./EntryDetail";

interface Props {
	entries: Entry[];
}

export const PatientEntries = ({ entries }: Props) => {
	return (
		<>
			{entries.map((entry) => (
				<EntryDetail entry={entry} key={entry.id} />
			))}
		</>
	);
};
