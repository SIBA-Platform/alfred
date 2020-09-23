import { createEventAdapter } from "@slack/events-api";
import { Service, Container } from "typedi";
import express from "express";
import { env } from "../env";
import { SlackChatService } from "../services/SlackChatService";
import { logger } from "../utils/Logger";
import { NotionNoteService } from "../services/NotionNoteService";

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
        logger.info("Event message is push inside");
        const isNotionNoteService = event.channel === env.slack.notionNoteChannelId && event.subtype === "bot_message";

        if(isNotionNoteService) {
            const reply = Container.get(NotionNoteService).createReply(event);
            Container.get(SlackChatService).postMessage(reply);
        }
    });
}