const express = require("express");
const router = express.Router();
const Note = require("../models/Notes.js");

Note.sync({ force: true });
const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
} = require("../Controllers/controller_notes.js");

// Crear una nueva nota
router.post("/note/create_note/", createNote);

// Obtener todas las notas
router.get("/note/all/", getAllNotes);

// Obtener una nota en particular y actualizarla según corresponda
router.get("/note/getnote/:id", getNote, getNoteById);
router.put("/note/put/:id", getNote, updateNote);
router.delete("/note/delete/:id", getNote, deleteNote);

async function getNote(req, res, next) {
    const Note = require("../models/Notes.js"); // Usamos el modelo correcto
    let note;
    try {
        note = await Note.findByPk(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: "Cannot find note" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.note = note;
    next();
}

module.exports = router;