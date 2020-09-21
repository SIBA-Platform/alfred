"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/**
 * NODE_ENV에 따라 다른 .env 파일 로드
 */
require("dotenv").config({
    path: `config/.env.${process.env.NODE_ENV || "development"}`,
});
/**
 * 환경변수 세팅
 */
exports.env = {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    app: {
        port: Number(process.env.PORT) || 3000,
    }
};
