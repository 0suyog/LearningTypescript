import diaryData from "../../data/entries";

import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";
import { ServerError } from "../utils";

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find((d) => d.id === id);
    if (!entry) throw new ServerError("Resource Not Found", 404);
    return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map((d) => d.id)) + 1,
        ...entry,
    };

    diaries.push(newDiaryEntry);

    return newDiaryEntry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
