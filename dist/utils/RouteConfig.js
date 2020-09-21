"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeControllerOptions = void 0;
exports.routeControllerOptions = {
    cors: true,
    //routePrefix: env.app.apiPrefix,
    controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
    middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
};
