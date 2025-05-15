import express from "express";

import diaryService from "../services/diaryService";

import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res, next) => {
    try {
        res.send(diaryService.getNonSensitiveEntries());
    } catch (error: unknown) {
        next(error);
    }
});
router.get("/all", (_req, res, next) => {
    try {
        res.send(diaryService.getEntries());
    } catch (err) {
        next(err);
    }
});
router.get("/:id", (req, res, next) => {
    try {
        const diary = diaryService.findById(Number(req.params.id));

        if (diary) {
            res.send(diary);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

router.post("/", (req, res, next) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        next(error);
    }
});

export default router;
