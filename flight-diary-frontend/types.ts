import { z } from "zod";
import {
    DiarySchema,
    NewDiarySchema,
    NonSensitiveDiarySchema,
    VisibilitySchema,
    WeatherSchema,
} from "./utils";

export type Visibility = z.infer<typeof VisibilitySchema>;

export type Weather = z.infer<typeof WeatherSchema>;

export type NewDiaryEntryType = z.infer<typeof NewDiarySchema>;

export type DiaryEntryType = z.infer<typeof DiarySchema>;

export type NonSensitiveDiaryEntryType = z.infer<
    typeof NonSensitiveDiarySchema
>;

export type PopupTypes = "error" | "success" | "warn" | "info";

export interface PopupType {
    id: number;
    type?: PopupTypes;
    message: string;
}
