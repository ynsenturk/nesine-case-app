import { useEffect, useState } from "react";
import { ITableColumn } from "../../interfaces";

const Text = ({ schema, event }: ITableColumn) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const textValue = event[schema.id as never];
    setValue(textValue);
    return () => {
      setValue("");
    };
  }, [event, schema]);
  return (
    <>
      {value ? (
        <div>
          {schema.id == "event_info" ? <strong>{event.C} </strong> : ""}
          {value}
        </div>
      ) : null}
    </>
  );
};

export default Text;
