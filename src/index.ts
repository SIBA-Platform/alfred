import express from "express";
import dotenv from "dotenv";

/**
 * NODE_ENV에 따른 .env 파일 로드
 */
dotenv.config({
    path: `config/.env.${process.env.NODE_ENV || "development"}`,
});

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res, next) => {
  res.send("home");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));