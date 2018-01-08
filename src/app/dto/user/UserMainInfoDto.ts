import { UserDto } from "./UserDto";

export class UserMainInfoDto {

    constructor(dto: UserDto) {
        this.id = dto.id;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.nickname = dto.nickname;
        this.dateOfBirth = dto.dateOfBirth;
    }

    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nickname: string;
}