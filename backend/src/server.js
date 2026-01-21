import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDb().then(() => {
  app.listen(5001, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
