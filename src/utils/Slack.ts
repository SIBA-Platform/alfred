import { createEventAdapter } from "@slack/events-api";
import {Service, Container} from "typedi";
import express from "express";
import { env } from "../env";
import { SlackMessageService } from "../services/SlackMessageService";

export function useSlackEvent (app: express.Application) {
    /**
     * slackEvent생성
     */
    const slackEvent = createEventAdapter(env.slack.signingSecret, {
        includeBody: true,
        includeHeaders: true,
    });
    
    app.use(env.slack.endPoint, slackEvent.expressMiddleware());

    /**
     * slack controller
     */
    slackEvent.on('message', async (event) => {
        console.log(event);
        Container.get(SlackMessageService).sendReply(event)
    });
}