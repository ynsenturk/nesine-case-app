import { IBetState } from "./BetContext";
import { BetActionTypes, IBetAction } from "./Types";

export const betReducer = (state: IBetState, action: IBetAction) => {
  switch (action.type) {
    case BetActionTypes.ADD_ODD: {
      const filteredOdds = state.odds.filter(
        (odd) => odd.NID != action.odd.NID
      );
      const odds = [action.odd, ...filteredOdds];
      const total =
        odds.length > 0
          ? odds.reduce((acc, odd) => acc * parseFloat(odd.O), 1).toFixed(2)
          : 0;
      return {
        ...state,
        odds,
        total,
      };
    }
    case BetActionTypes.REMOVE_ODD: {
      const odds = state.odds.filter((odd) => odd.NID != action.odd.NID);
      const total =
        odds.length > 0
          ? odds.reduce((acc, odd) => acc * parseFloat(odd.O), 1).toFixed(2)
          : 0;
      return {
        ...state,
        odds,
        total,
      };
    }
    default:
      return state;
  }
};
