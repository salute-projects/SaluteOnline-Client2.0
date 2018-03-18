import { UserStatus } from "../enums";

export class SetStatusRequest {
    userId: number;
    status: UserStatus;
}