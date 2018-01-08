export class ServiceProps {
    constructor() {
        this.night = true;
        this.notOnVote = Array.apply(null, { length: 10 }).map((value: any, index: number) => index + 1);
        this.onVote = [];
        this.killQueue = 1;
        this.miskills = 0;
        this.canFillRedRoles = false;
        this.canClearRoles = false;
        this.rolesValid = false;
        this.nicksValid = false;
        this.checkVisibility = false;
        this.checkSuccess = null;
        this.checkTypeIsDon = null;
        this.currentCheckIndex = null;
    }

    night: boolean;
    onVote: number[];
    notOnVote: number[];
    killQueue: number;
    miskills: number;
    canFillRedRoles: boolean;
    canClearRoles: boolean;
    rolesValid: boolean;
    nicksValid: boolean;
    checkVisibility: boolean;
    checkSuccess: boolean | null;
    checkTypeIsDon: boolean | null;
    currentCheckIndex: number | null;
}