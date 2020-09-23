import {
    IsNotEmpty,
    IsPositive,
    IsNumber,
    Max,
    IsString,
    IsOptional,
} from "class-validator";

/**
 * 
 */
export class SlackEventDto {
    @IsOptional()
    client_msg_id: string;

    @IsNotEmpty()
    type: string;

    @IsOptional()
    subtype: string;

    @IsOptional()
    bot_id: string;

    @IsNotEmpty()
    text: string;

    @IsOptional()
    user: string;

    @IsNotEmpty()
    ts: string;

    @IsOptional()
    team: string;

    @IsOptional()
    blocks: Object[];

    @IsOptional()
    attachments: AttachmentsDto[]

    @IsNotEmpty()
    channel: string;

    @IsOptional()
    event_ts: string;

    @IsOptional()
    channel_type: string;
}

export class AttachmentsDto {
    @IsOptional()
    text: string;

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    fallback: string;

    @IsOptional()
    footer: string;

    @IsOptional()
    ts: number;
}