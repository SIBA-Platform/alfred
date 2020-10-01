import { Service, Container, Inject } from "typedi";
import { NotionNoteService } from "./NotionNoteService"
import { SlackEventDto } from "../dtos/SlackEventDto"
import { WebClient } from "@slack/web-api";
import { env } from "../env";
import { logger } from "../utils/Logger";

/**
 * JsonController 적용이 안되어 Service로 대체
 */
@Service()
export class SlackChatService {

    private webClient: WebClient;

   /**
    * Slack WebClient 생성
    */
    constructor() {
        this.webClient = new WebClient(env.slack.botUserOauthAccessToekn);
    }

    /**
     * 
     * @param replyMessage 
     */
    public postMessage(replyMessage) {
        //replyMessage가 존재한다면
        if(replyMessage){
            logger.info(`write message to ${replyMessage.channel}`);
            this.webClient.chat.postMessage(replyMessage);
        }
    }
}