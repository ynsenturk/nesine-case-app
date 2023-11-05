import { useState, useEffect, useContext } from "react";
import { IOdd, ITableColumn } from "../../interfaces";
import { BetContext } from "../../contexts";
import { BetActionTypes } from "../../contexts/BetContext";

const Odd = ({ schema, event }: ITableColumn) => {
  const [odd, setOdd] = useState<IOdd>({} as IOdd);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { state, dispatch } = useContext(BetContext);

  const clickedOdd = () => {
    const { C, N, NID } = event;
    const [, marketId, oddId ] = schema.id.split("-");
    const betOdd = { ...odd, C, N, NID,  MID: marketId };
    const isIncludeSameOdd = state.odds.find(({ NID, MID, ID }) => betOdd.NID == NID && MID == marketId && ID == oddId);
    const action = isIncludeSameOdd ? BetActionTypes.REMOVE_ODD: BetActionTypes.ADD_ODD;
    dispatch({ type: action, odd: betOdd })
  }

  useEffect(() => {
    const [, marketId, oddId] = schema.id.split("-");
    const odd = event.OCG[marketId as never].OC[oddId as never];
    const isOddActive = state.odds.some(item => item.NID == event.NID && item.MID == marketId && item.ID == oddId);
    setOdd(odd);
    setIsActive(isOddActive)
    return () => {
      setOdd({} as IOdd)
    }
  }, [schema, event, state,])

  return <div className={isActive ? 'odd odd-active': 'odd'} onClick={clickedOdd}>
    {odd ? odd.O : ''}
  </div>;
};

export default Odd;
