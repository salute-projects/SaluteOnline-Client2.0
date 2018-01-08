import { MembershipRequestStatus } from "../enums";

export class HandleMembershipRequestDto {
    clubId: number;
    requestId: number;
    status: MembershipRequestStatus;
}