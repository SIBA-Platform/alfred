import { Service } from "typedi";
import { SlackEventDto, AttachmentsDto } from "../dtos/SlackEventDto"
import { env } from "../env";

@Service()
export class NotionNoteService {

    private stateChangePattern: RegExp;
    private titlePattern: RegExp;

    constructor() {
        this.stateChangePattern = /\*상태\*:.*\s→\s작성완료/;
        this.titlePattern = /\*<.*>\*/;
    }

    /**
     * event가 noti-notion채널에 들어온 것인지와 Notion앱으로부터 생성된 메시지 검증
     * @param event 
     */
    public createReply(event: SlackEventDto): Object {
        let replyMessage = null;

        //상태가 변경되었다면 응답 메시지 생성
        if(this.isStateChanged(event.attachments)) {
            replyMessage = {
                text: "새로운 작업기록이 등록되었습니다.\n 작업기록 확인후 쓰레드를 통해 꼭 리뷰해주세요.",
                attachments: [
                    {
                        text: this.titlePattern.exec(event.text)[0],
                        color: "#007ACC",
                        footer: event.attachments[event.attachments.length-1].footer,
                        ts: event.ts,
                        id: 1
                    }
                ],
                channel: env.slack.generalChannelId
            };
        }

        return replyMessage;
    }

    /**
     * 기록의 상태가 변경되었는지 검사
     * @param attachments 
     */
    private isStateChanged(attachments: AttachmentsDto[]): boolean {
        let result = false;

        //아래의 패턴이 일치하다면 기록이 등록된 것으로 간주
        attachments.some((element) => {
            result = this.stateChangePattern.test(element.text);
            return this.stateChangePattern.test(element.text);
        })

        return result;
    }
}
