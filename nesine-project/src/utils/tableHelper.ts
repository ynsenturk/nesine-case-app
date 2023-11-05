import { IEvent, IHeaderDescription } from "../interfaces";
import { COLUMN_TYPES } from "../interfaces/ITable";

const getTournamentEvents = (events: IEvent[]) => {
  return events.map((event) => ({
    ...event,
    tournament_info: `${event.D} ${event.DAY} ${event.LN}`,
    event_info: `${event.T} ${event.N}`,
    extra_markets: Object.keys(event.OCG).length ?? 0
  }));
};

const generateHeaderDescriptions = (events: IEvent[]) => {
  const headerDescriptions = [] as IHeaderDescription[];
  const validEvent = events.find((event) => Object.values(event.OCG).length);

  if (!validEvent) return headerDescriptions;

  const defaultColumsn = [
    {
      id: "tournament_info",
      name: "name",
    },
    {
      id: "comment",
      name: "Yorumlar",
    },
    {
      id: "mbs",
      name: "",
    },
  ];

  headerDescriptions.push(...defaultColumsn);

  const marketColumns = Object.values(validEvent.OCG).reduce(
    (columns, market) => {
      const newColumns = Object.values(market.OC).reduce((oddColumns, odd) => {
        return [
          ...oddColumns,
          {
            id: `odd-${market.ID}-${odd.ID}`,
            name: odd.N,
          },
        ];
      }, [] as IHeaderDescription[]);
      return { ...columns, [market.ID]: newColumns };
    },
    {} as { [key: number]: IHeaderDescription[] }
  );

  // 1 => Maç Sonucu 2 => Çifte Şans 5 => Alt/Üst 2,5 Gol
  // add 'Maç Sonucu' and 'Alt/Üst 2,5 Gol' market columns

  headerDescriptions.push(
    ...marketColumns[1],
    {
      id: "odd-1-2",
      name: "2",
    },
    ...marketColumns[5],
    {
      id: "h1",
      name: "H1",
    },
    {
      id: "default-a-1",
      name: "1",
    },
    {
      id: "default-a-2",
      name: "X",
    },
    {
      id: "default-a-3",
      name: "2",
    },
    {
      id: "h2",
      name: "H2",
    },
    ...marketColumns[2],
    {
      id: "var",
      name: "VAR",
    },
    {
      id: "yok",
      name: "YOK",
    },
    {
      id: "extra_markets",
      name: "+99",
    }
  );

  return headerDescriptions;
};

const generateSchema = (
  headerDescriptions: IHeaderDescription[]
): {
  firstRowSchema: IHeaderDescription[];
  secondRowSchema: IHeaderDescription[];
} => {
  const secondRowSchema = headerDescriptions.reduce((acc, cur, index) => {
    if (index == 0)
      return [
        ...acc,
        { id: "event_info", name: "event-name", type: COLUMN_TYPES.TEXT },
      ];
    return [
      ...acc,
      {
        ...cur,
        type: cur.id.includes("odd") ? COLUMN_TYPES.ODD : COLUMN_TYPES.TEXT,
      },
    ];
  }, [] as IHeaderDescription[]);
  return { firstRowSchema: headerDescriptions, secondRowSchema };
};

export { getTournamentEvents, generateHeaderDescriptions, generateSchema };
