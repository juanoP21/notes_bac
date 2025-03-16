const Note = require("../models/Notes.js");
const User = require("../models/Usuarios");
const jwt = require("jsonwebtoken");

// Crear nota: se espera recibir "user_id" en el body además de "title" y "content"
const createNote = async (req, res) => {

  const token = req.header("Authorization");
  const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user_id: uid,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todas las notas incluyendo los datos del usuario asociado
const getAllNotes = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    const notes = await Note.findAll({
      where: { user_id: uid },
      include: [
        {
          model: User,
          attributes: ["user_id", "username"],
        },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNoteById = (req, res) => {
  // Se asume que el middleware "getNote" en la ruta ya busca la nota.
  res.json(res.note);
};

const updateNote = async (req, res) => {
  if (req.body.title != null) {
    res.note.title = req.body.title;
  }
  if (req.body.content != null) {
    res.note.content = req.body.content;
  }
  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    // Se asume que el middleware "getNote" ya asigna la nota a res.note
    if (!res.note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await res.note.destroy();
    res.json({ message: "Deleted Note" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};