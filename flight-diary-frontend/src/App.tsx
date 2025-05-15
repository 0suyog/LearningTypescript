import { useEffect, useState } from "react";
import diaryServices from "../services/diaryService";
import type { PopupType, PopupTypes, DiaryEntryType } from "../types";
import { DiaryEntry } from "./DiaryEntry";
import { DiaryForm } from "./DiaryForm";
import { Popup } from "./Popup";

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntryType[]>([]);
    const [popups, setPopups] = useState<PopupType[]>([]);

    const addPopup = (message: string, type = "error" as PopupTypes) => {
        const id = Date.now();
        const popup: PopupType = {
            id: id,
            message: message,
            type: type,
        };
        setPopups([...popups, popup]);
    };

    useEffect(() => {
        (async () => {
            const allEntries = await diaryServices.getAllDiaries();
            setDiaryEntries(allEntries);
        })();
    }, []);
    return (
        <div>
            {popups.map((popup) => (
                <Popup
                    key={popup.id}
                    id={popup.id}
                    message={popup.message}
                    type={popup.type}
                    onTimeOut={setPopups}
                />
            ))}
            <DiaryForm addPopup={addPopup} setDiaryEntries={setDiaryEntries} />
            {diaryEntries.map((entry) => {
                return <DiaryEntry entry={entry} key={entry.date} />;
            })}
        </div>
    );
}

export default App;
