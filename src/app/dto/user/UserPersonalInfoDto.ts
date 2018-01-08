import { UserDto } from "./UserDto";

export class UserPersonalInfoDto {

    constructor(dto: UserDto) {
        this.id = dto.id;
        this.phone = dto.phone;
        this.country = dto.country;
        this.city = dto.city;
        this.address = dto.address;
        this.alternativeEmail = dto.alternativeEmail;
        this.facebook = dto.facebook;
        this.twitter = dto.twitter;
        this.vk = dto.vk;
        this.instagram = dto.instagram;
        this.skype = dto.skype;
    }

    id: number;
    phone: string;
    country: string;
    city: string;
    address: string;
    alternativeEmail: string;
    facebook: string;
    twitter: string;
    vk: string;
    instagram: string;
    skype: string;
}