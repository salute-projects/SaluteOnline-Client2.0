export class CreateClubDto {
    constructor() {
        this.title = '';
        this.country = '';
        this.city = '';
        this.description = '';
    }

    title: string;
    country: string;
    city: string;
    description: string;
}