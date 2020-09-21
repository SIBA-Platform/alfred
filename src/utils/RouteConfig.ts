import { env } from "../env";

export const routeControllerOptions = {
	cors: true,
	//routePrefix: env.app.apiPrefix,
	controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
	middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
};