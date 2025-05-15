import type { DiaryEntryType } from "../types";

interface DiaryEntryProps {
    entry: DiaryEntryType;
}
export const DiaryEntry = ({ entry }: DiaryEntryProps) => {
    return (
        <div>
            <strong>{entry.date}</strong>
            <p>
                Visibility: {entry.visibility} <br />
                Weather: {entry.weather} <br />
                Comment: {entry.comment}
            </p>
        </div>
    );
};
