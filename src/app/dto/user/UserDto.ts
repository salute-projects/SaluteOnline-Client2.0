import { UserStatus } from "../enums";

export class UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    country: string;
    city: string;
    address: string;
    alternativeEmail: string;
    facebook: string;
    twitter: string;
    vk: string;
    instagram: string;
    skype: string;
    status: UserStatus;
    role: number;
    registered: Date;
    lastActivity: Date;
    nickname: string;
    avatar: string;
}