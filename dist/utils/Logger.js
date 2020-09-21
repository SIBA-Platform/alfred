"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, printf, prettyPrint, colorize, json, errors, } = winston_1.format;
const logDirectory = "logs";
const filename = path_1.join(logDirectory, "app-%DATE%.log");
const level = process.env.NODE_ENV === "production" ? "error" : "debug";
if (!fs_1.existsSync(logDirectory)) {
    fs_1.mkdirSync(logDirectory);
}
/**
 * 콘솔 로그 출력 포맷 설정
 */
const consoleOutputFormat = combine(colorize(), prettyPrint(), json(), printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
}));
/**
 * 파일 로그 출력 포맷 설정
 */
const fileOutputFormat = combine(printf((info) => {
    if (info.stack) {
        return `${info.timestamp} ${info.level} ${info.message} : ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
}));
const options = {
    level,
    exitOnError: false,
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true })),
    transports: [
        // 콘솔 로그 출력
        new winston_1.transports.Console({
            handleExceptions: true,
            format: consoleOutputFormat,
        }),
        // 파일 로그 출력
        new DailyRotateFile({
            handleExceptions: true,
            format: fileOutputFormat,
            filename,
        }),
    ],
};
const logger = winston_1.createLogger(options);
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.stream = stream;
