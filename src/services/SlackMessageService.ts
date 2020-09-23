import { Service } from "typedi";
import { WebClient } from "@slack/web-api";
import { env } from "../env";
import { CreateSlackEventDto } from "../dtos/SlackEventDto"

@Service()
export class SlackMessageService {

    private webClient: WebClient;

   /**
    * Slack WebClient 생성
    */
    constructor() {
        this.webClient = new WebClient(env.slack.botUserOauthAccessToekn);
    }

    public async sendReply(event: CreateSlackEventDto) {

        if(event.text==="안녕") {
            this.webClient.chat.postMessage({
                text: 'your test success',
                channel: event.channel,
            });
        }
    }
}
