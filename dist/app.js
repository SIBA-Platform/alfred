"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const RouteConfig_1 = require("./utils/RouteConfig");
const Logger_1 = require("./utils/Logger");
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor() {
        this.app = express_1.default();
        this.setMiddlewares();
    }
    /**
     * 미들웨어 세팅
     */
    setMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default("dev", { stream: Logger_1.stream }));
    }
    /**
     * Express시작
     * @param port 포트
     */
    createExpressServer(port) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                routing_controllers_1.useContainer(typedi_1.Container);
                routing_controllers_1.useExpressServer(this.app, RouteConfig_1.routeControllerOptions);
                this.app.listen(port, () => {
                    Logger_1.logger.info(`Server is running on http://localhost:${port}`);
                });
            }
            catch (error) {
                Logger_1.logger.error(error);
            }
        });
    }
}
exports.App = App;
