import { Teams } from "../enums";
import { PlayerEntry } from "./PlayerEntry";

export class Protocol {
    constructor() {
        this.winner = Teams.None;
        this.game = null;
        this.table = null;
        this.killedAtDay = [];
        this.killedAtNight = [];
        this.bestWay = [];
        this.donCheck = null;
        this.sheriffCheck = null;
        this.threeCheck = null;
        this.techRed = false;
        this.techBlack = false;
        this.ugadayka = [];
        this.ugadaykaEnabled = false;
        this.falseSheriff = null;
        this.sheriffFirstKilled = false;
        this.players = [];
    }

    winner: Teams;
    game: number | null;
    table: number | null;
    killedAtDay: number[];
    killedAtNight: number[];
    bestWay: number[];
    donCheck: number | null;
    sheriffCheck: number | null;
    threeCheck: number | null;
    techRed: boolean;
    techBlack: boolean;
    ugadayka: number[];
    ugadaykaEnabled: boolean;
    falseSheriff: number | null;
    sheriffFirstKilled: boolean;
    players: PlayerEntry[];
}