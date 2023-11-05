import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks";
import { END_POINTS } from "../consts";
import {
  generateHeaderDescriptions,
  generateSchema,
  getTournamentEvents,
} from "../utils";
import { IEvent, IHeaderDescription } from "../interfaces";
import { COLUMN_TYPES } from "../interfaces/ITable";
import { Odd, Text } from "../components";

const Tournament = () => {
  const [count,setCount] = useState(50);
  const dataFetchRef = useRef<boolean>(true);

  const {
    data: events,
    loading,
    error,
  } = useFetch(END_POINTS.EVENTS, dataFetchRef);

  const eventsCount = events.length ?? 0;

  const headerDescriptions = generateHeaderDescriptions(events);

  const defaultHeaderDescriptions = headerDescriptions.slice(1);

  const tournamentEvents = getTournamentEvents(events);

  const { firstRowSchema, secondRowSchema } =
    generateSchema(headerDescriptions);

  const generateColumnComponent = (
    schema: IHeaderDescription,
    event: IEvent
  ) => {
    const props = { schema, event };
    if (schema.type == COLUMN_TYPES.TEXT) return <Text {...props} />;
    return <Odd {...props} />;
  };

  console.log(headerDescriptions, firstRowSchema, secondRowSchema);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop +1 > document.documentElement.scrollHeight) {
      setCount(count + 50)
      console.log('count:',count)
    }
   
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!headerDescriptions || !headerDescriptions.length)
    return <div>No table data</div>;

  console.log("data", events);
  return (
    <div className="tournament-container">
      <table className="tournament-table">
        <thead>
          <tr key="header" className="table-header-column">
            <th key="event-count">Event Count: {eventsCount}</th>
            {defaultHeaderDescriptions.map(({ id, name }) => (
              <th key={id} className={id}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key='body'>
          {!!tournamentEvents && tournamentEvents.length > 0 ? (
            tournamentEvents.slice(0, count).map((event) => {
              return (
                <>
                  <tr key={event.NID} className="event-first-row">
                    {firstRowSchema.map((schema) => {
                      return (
                        <td className={schema.name} key={`${event.NID}-${schema.id}`}>
                          {schema.id == "tournament_info"
                            ? event.tournament_info
                            : schema.name}
                        </td>
                      );
                    })}
                  </tr>
                  <tr key={`${event.NID}-1`} className="event-second-row">
                    {secondRowSchema.map((schema) => {
                      return (
                        <td className={schema.name} key={`${event.NID}-${schema.id}`}>
                          {generateColumnComponent(schema, event)}
                        </td>
                      );
                    })}
                  </tr>
                </>
              );
            })
          ) : (
            <div>No Table Events</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tournament;
