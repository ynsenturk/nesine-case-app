interface IOdd {
    G: string;
    ID: string;
    IMF: boolean;
    N: string;
    MBS: string;
    O: string;
    OD: number;
}
interface IMarket {
    ID: string;
    MBS: string;
    N: string;
    OC: { [key: number]: IOdd };
    SO: number;
}

interface IEvent {
    C: string;
    D: string;
    DAY: string;
    HEC: boolean;
    IMF: boolean;
    LN: string;
    N: string;
    NID: string;
    OCG: { [key: number]: IMarket };
    S: string;
    T: string;
    TYPE: string;
    tournament_info?: string;
    event_info?: string;
    extra_markets?: number;
}

export type { IEvent, IMarket, IOdd }