import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Invalid note ID",
      });
    }
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ msg: "Note Not Found!" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Invalid note ID",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true },
    );
    if (!updatedNote) return res.status(404).json({ msg: "Note Not Found!" });
    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "Invalid note ID",
      });
    }
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ msg: "Note Not Found!" });
    res.status(200).json({ msg: "Note Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
