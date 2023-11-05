import { Dispatch } from "react";
import { BetActionTypes, IBetAction, IBetOdd } from "./Types";

const addOdd = (dispatch: Dispatch<IBetAction>, odd: IBetOdd) =>
    dispatch({ type: BetActionTypes.ADD_ODD, odd });

const removeOdd = (dispatch: Dispatch<IBetAction>, odd: IBetOdd) =>
    dispatch({ type: BetActionTypes.REMOVE_ODD, odd });


export { addOdd, removeOdd }