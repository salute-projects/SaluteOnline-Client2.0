import { Roles } from "../enums";

export class Role {
    constructor(role: Roles, label: string) {
        this.role = role;
        this.label = label;
    }
    role: Roles;
    label: string;
}