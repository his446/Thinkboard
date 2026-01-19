import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
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
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ msg: "Note Not Found!" });
    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error in cupdateNote controller", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  res.status(200).json({ msg: "Note deleted successfully!" });
};
