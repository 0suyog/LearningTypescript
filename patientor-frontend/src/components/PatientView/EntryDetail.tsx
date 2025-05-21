import { Entry } from "../../types";
import { HealthCheckEntry } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";
import { OccupationalHealthCareEntry } from "./OccupationalHealthCareEntry";

interface Props {
    entry: Entry;
}

export const EntryDetail = ({ entry }: Props) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry} />;
    }
};
