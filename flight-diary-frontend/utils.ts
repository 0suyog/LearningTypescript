import { z } from "zod";
// import type { Visibility, Weather } from "./types";
export const WeatherSchema = z.union([
    z.literal("sunny"),
    z.literal("windy"),
    z.literal("rainy"),
    z.literal("cloudy"),
    z.literal("stormy"),
]);

export const VisibilitySchema = z.union([
    z.literal("ok"),
    z.literal("good"),
    z.literal("great"),
    z.literal("poor"),
]);

export const NewDiarySchema = z.object({
    date: z.string().date(),
    weather: WeatherSchema,
    visibility: VisibilitySchema,
    comment: z.string(),
});

export const DiarySchema = NewDiarySchema.extend({
    id: z.number(),
});

export const DiaryEntriesSchema = z.array(DiarySchema);

export const NonSensitiveDiarySchema = DiarySchema.omit({
    comment: true,
});

export const NonSensitiveDiaryEntriesSchema = z.array(NonSensitiveDiarySchema);
