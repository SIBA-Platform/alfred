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
export class CreateSlackEventDto {
    @IsNotEmpty()
    client_msg_id: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    ts: string;

    @IsNotEmpty()
    team: string;

    @IsNotEmpty()
    blocks: Object[];

    @IsNotEmpty()
    channel: string;

    @IsNotEmpty()
    event_ts: string;

    @IsNotEmpty()
    channel_type: string;
}