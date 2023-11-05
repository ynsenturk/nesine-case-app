import { IOdd } from "../../interfaces";

interface IBetOdd extends IOdd {
    C: string;
    N: string;
    MID: string;
    NID: string;
}

enum BetActionTypes {
    ADD_ODD = 'ADD_ODD',
    REMOVE_ODD = 'REMOVE_ODD'
}

interface IBetAction {
    type: BetActionTypes;
    odd: IBetOdd;
}
export { BetActionTypes }
export type { IBetAction, IBetOdd }