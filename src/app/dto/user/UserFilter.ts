import { BaseFilter } from "../common/index";
import { Role, UserStatus } from "../enums";

export class UserFilter extends BaseFilter {
    constructor() {
        super();
        this.asc = false;
        this.page = 1;
        this.pageSize = 25;
        this.orderBy = "";
        this.role = Role.None;
        this.status = UserStatus.None;
        this.name = "";
        this.email = "";
        this.nickname = "";
        this.country = "";
        this.city = "";
    }
    
    name: string;
    email: string;
    nickname: string;
    city: string;
    country: string;
    role: Role;
    status: UserStatus;
}