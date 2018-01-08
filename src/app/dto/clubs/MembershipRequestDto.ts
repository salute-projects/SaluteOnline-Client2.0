import { MembershipRequestStatus } from "../enums";
import { UserMainInfoDto } from "../user";

export class MembershipRequestDto {
    id: number;
    nickname: string;
    selectedFromExisting: boolean;
    created: Date;
    lastActivity: Date;
    status: MembershipRequestStatus;
    userInfo: UserMainInfoDto;
}