import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";

const app = express();

connectDb();

app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
