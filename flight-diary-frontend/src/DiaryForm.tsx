import React, { useState } from "react";
import diaryServices from "../services/diaryService";
import type {
    DiaryEntryType,
    NewDiaryEntryType,
    PopupTypes,
    Visibility,
    Weather,
} from "../types";
import { isAxiosError } from "axios";

interface DiaryFormProps {
    addPopup: (message: string, type: PopupTypes) => void;
    setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntryType[]>>;
}

export const DiaryForm = ({ addPopup, setDiaryEntries }: DiaryFormProps) => {
    const [date, setDate] = useState<string>("");
    const [weather, setWeather] = useState<Weather>("sunny" as Weather);
    const [visibility, setVisibility] = useState<Visibility>(
        "good" as Visibility
    );
    const [comment, setComment] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newDiaryEntry: NewDiaryEntryType = {
            date,
            visibility,
            weather,
            comment,
        };
        try {
            const diaryEntry = await diaryServices.addNewDiaryEntry(
                newDiaryEntry
            );
            setDiaryEntries((entries) => [...entries, diaryEntry]);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                console.log(err);
                const errorMessage =
                    err?.response?.data?.message || "Something Went Wrong ";
                addPopup(errorMessage, "error");
            }
        }
    };

    const handleRadioButtons = (weather: Weather) => {
        setWeather(weather);
    };

    const handleVisibility = (visibility: Visibility) => {
        setVisibility(visibility);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">
                Date:
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <br />
            Weather:
            <label htmlFor="sunny">
                Sunny:
                <input
                    id="sunny"
                    type="radio"
                    name="weather"
                    checked={"sunny" === weather}
                    onChange={() => handleRadioButtons("sunny")}
                />
            </label>
            <label htmlFor="rainy">
                Rainy:
                <input
                    id="rainy"
                    type="radio"
                    name="weather"
                    checked={"rainy" === weather}
                    onChange={() => handleRadioButtons("rainy")}
                />
            </label>
            <label htmlFor="cloudy">
                Cloudy:
                <input
                    id="cloudy"
                    type="radio"
                    name="weather"
                    checked={"cloudy" === weather}
                    onChange={() => handleRadioButtons("cloudy")}
                />
            </label>
            <label htmlFor="stormy">
                Stormy:
                <input
                    id="stormy"
                    type="radio"
                    name="weather"
                    checked={"stormy" === weather}
                    onChange={() => handleRadioButtons("stormy")}
                />
            </label>
            <label htmlFor="windy">
                Windy:
                <input
                    id="windy"
                    type="radio"
                    name="weather"
                    checked={"windy" === weather}
                    onChange={() => handleRadioButtons("windy")}
                />
            </label>
            <br />
            {/* <select
                name="weather"
                id="weather"
                value={weather}
                onChange={(e) =>
                    setWeather(e.target.value.toLowerCase() as Weather)
                }>
                {Object.values(Weather).map((w) => (
                    <option key={w} value={w}>
                        {w}
                    </option>
                ))}
            </select> */}
            {/* <input
                type="text"
                id="weather"
                onChange={(e) => setWeather(e.target.value.toLowerCase() as Weather)}
                value={weather}
            /> */}
            {/* <label htmlFor="visibility">Visibility: </label> */}
            <label htmlFor="great">
                Great:
                <input
                    type="radio"
                    name="great"
                    id="great"
                    checked={"great" === visibility}
                    onChange={() => handleVisibility("great")}
                />
            </label>
            <label htmlFor="good">
                Good:
                <input
                    type="radio"
                    name="good"
                    id="good"
                    checked={"good" === visibility}
                    onChange={() => handleVisibility("good")}
                />
            </label>
            <label htmlFor="ok">
                Ok:
                <input
                    type="radio"
                    name="ok"
                    id="ok"
                    checked={"ok" === visibility}
                    onChange={() => handleVisibility("ok")}
                />
            </label>
            <label htmlFor="poor">
                Poor:
                <input
                    type="radio"
                    name="poor"
                    id="poor"
                    checked={"poor" === visibility}
                    onChange={() => handleVisibility("poor")}
                />
            </label>{" "}
            <br />
            {/* <select
                name="visibility"
                id="visibility"
                value={visibility}
                onChange={(e) =>
                    setVisibility(e.target.value.toLowerCase() as Visibility)
                }>
                {Object.values(Visibility).map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select> */}
            {/* <input
                type="text"
                id="visibility"
                onChange={(e) => setVisibility(e.target.value.toLowerCase() as Visibility)}
            /> */}
            <label htmlFor="comment">Comment:</label>
            <input
                type="text"
                id="comment"
                onChange={(e) => setComment(e.target.value.toLowerCase())}
                value={comment}
            />
        </form>
    );
};
