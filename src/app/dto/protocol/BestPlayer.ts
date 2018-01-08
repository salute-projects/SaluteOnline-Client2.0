import { BestPlayers } from "../enums";

export class BestPlayer {
    constructor(value: BestPlayers, label: string, enabled: boolean) {
        this.value = value;
        this.label = label;
        this.enabled = enabled;
    }
    value: BestPlayers;
    label: string;
    enabled: boolean;
}