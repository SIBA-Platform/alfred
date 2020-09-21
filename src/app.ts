
import express from "express";
import bodyParser from "body-parser";
import { Container } from "typedi";
import {
    useContainer as routingUseContainer,
    useExpressServer,
} from "routing-controllers";
import { routeControllerOptions } from "./utils/RouteConfig";
import { logger, stream } from "./utils/Logger";
import morgan from "morgan";

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setMiddlewares();
    }

    /**
     * 미들웨어 세팅
     */
    private setMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan("dev", { stream }));
    }

    /**
     * Express시작
     * @param port 포트
     */
    public async createExpressServer(port: number): Promise<void> {
        try {
            routingUseContainer(Container);
            useExpressServer(this.app, routeControllerOptions);

            this.app.listen(port, () => {
                logger.info(`Server is running on http://localhost:${port}`);
            });
        } catch (error) {
            logger.error(error);
        }
    }
}