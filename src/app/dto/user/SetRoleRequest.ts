import { Role } from "../enums";

export class SetRoleRequest {
    userId: number;
    role: Role;
}