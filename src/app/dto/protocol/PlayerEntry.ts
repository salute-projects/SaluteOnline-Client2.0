import { Role } from "./Role";
import { Roles, BestPlayers } from "../enums";
import { BestPlayer } from "./BestPlayer";

export class PlayerEntry {
    constructor(index: number) {
        this.index = index;
        this.nickname = '';
        this.role = null;
        this.foul = null;
        this.bestPlayer = null;
        this.result = null;
        this.mainScore = null;
        this.additionalScore = null;
        this.positionInKillQueue = null;
        this.killedAtDay = false;
        this.killedAtNight = false;
        this.checkedAtNight = false;
        this.halfBestWay = false;
        this.fullBestWay = false;
        this.rolesAvailable = [new Role(Roles.Sheriff, Roles[1]), new Role(Roles.Don, Roles[2]), new Role(Roles.Mafia, Roles[3]), new Role(Roles.Red, Roles[4])];
        this.bestPlayersAvailable = [new BestPlayer(BestPlayers.None, '', true), new BestPlayer(BestPlayers.Best1, 'Best 1', true),
            new BestPlayer(BestPlayers.Best2, 'Best 2', true), new BestPlayer(BestPlayers.Best3, 'Best 3', true)];
    }

    index: number | null;
    nickname: string;
    role: Role | null;
    foul: number | null;
    bestPlayer: BestPlayer | null;
    result: number | null;
    mainScore: number | null;
    additionalScore: number | null;
    positionInKillQueue: number | null;
    killedAtDay: boolean;
    killedAtNight: boolean;
    checkedAtNight: boolean;
    halfBestWay: boolean;
    fullBestWay: boolean;
    rolesAvailable: Role[];
    bestPlayersAvailable: BestPlayer[];
}