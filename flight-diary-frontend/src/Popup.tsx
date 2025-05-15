import { useEffect } from "react";
import { type PopupType } from "../types";

interface PopupProps extends PopupType {
    onTimeOut: React.Dispatch<React.SetStateAction<PopupType[]>>;
}

export const Popup = ({
    id,
    message,
    type = "error",
    onTimeOut,
}: PopupProps) => {
    let color = "red";
    switch (type) {
        case "warn":
            color = "yellow";
            break;
        case "success":
            color = "green";
            break;
        case "info":
            color = "blue";
            break;
        default:
            color = "red";
    }

    useEffect(() => {
        setTimeout(() => {
            onTimeOut((popups) => popups.filter((popup) => popup.id !== id));
        }, 3000);
    }, [id, onTimeOut]);

    return <p style={{ color: color }}>{message}</p>;
};
