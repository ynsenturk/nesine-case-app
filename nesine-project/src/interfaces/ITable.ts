import { IEvent } from ".";

enum COLUMN_TYPES {
    TEXT = "TEXT",
    ODD = "ODD"
}

interface IHeaderDescription {
    id: string;
    name: string;
    type?: keyof typeof COLUMN_TYPES
}

interface ITableColumn {
    schema: IHeaderDescription;
    event: IEvent;
}

export { COLUMN_TYPES }
export type { IHeaderDescription, ITableColumn };