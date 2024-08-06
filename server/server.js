import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./src/utils/database.js";

import userRoutes from "./src/routes/user.routes.js";
import catalogueRoutes from "./src/routes/catalog.routes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
}));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

app.get("/api", function (req, res) {
  return res.status(200).json({ success: true, payload: `serving requests on port ${PORT}` });
});

app.use("/api/user", userRoutes);
app.use("/api/catalogue", catalogueRoutes);


app.listen(PORT, function () {
  database();
  console.log(`application listening on port ${PORT}`);
});