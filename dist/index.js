"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * NODE_ENV에 따른 .env 파일 로드
 */
dotenv_1.default.config({
    path: `config/.env.${process.env.NODE_ENV || "development"}`,
});
const app = express_1.default();
const PORT = process.env.PORT;
app.get("/", (req, res, next) => {
    res.send("home");
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
