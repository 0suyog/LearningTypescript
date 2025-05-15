import type {
    DiaryEntryType,
    NewDiaryEntryType,
    NonSensitiveDiaryEntryType,
} from "../types";
import {
    DiaryEntriesSchema,
    DiarySchema,
    NonSensitiveDiaryEntriesSchema,
} from "../utils";
import axios from "axios";
const BASEURL = "http://localhost:3000/api/diaries";
const getAllDiaries = async (): Promise<DiaryEntryType[]> => {
    const response = await axios.get(`${BASEURL}/all`);
    const allDiaries = DiaryEntriesSchema.parse(response.data);
    return allDiaries;
};

const getSensitiveData = async (): Promise<NonSensitiveDiaryEntryType[]> => {
    const response = await axios.get(`${BASEURL}/`);
    const allEntries = NonSensitiveDiaryEntriesSchema.parse(response.data);
    return allEntries;
};

const addNewDiaryEntry = async (
    entry: NewDiaryEntryType
): Promise<DiaryEntryType> => {
    const response = await axios.post(`${BASEURL}/`, entry);
    const newDairyEntry: DiaryEntryType = DiarySchema.parse(response.data);
    return newDairyEntry;
};

const diaryServices = {
    getAllDiaries,
    getSensitiveData,
    addNewDiaryEntry,
};

export default diaryServices;
