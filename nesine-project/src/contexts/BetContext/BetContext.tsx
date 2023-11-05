import { Dispatch, createContext, useReducer } from "react";
import { IBetAction, IBetOdd } from "./Types";
import { betReducer } from "./Reducer";

interface IBetState {
  total: number;
  odds: IBetOdd[];
}

interface IBetContext {
  state: IBetState;
  dispatch: Dispatch<IBetAction>;
}

const initialState: IBetState = {
  total: 0,
  odds: [],
};

const BetContext = createContext<IBetContext>({
  state: initialState,
  dispatch: () => {},
});

const BetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(betReducer, initialState as IBetState);
  return (
    <BetContext.Provider value={{ state, dispatch }}>
      {children}
    </BetContext.Provider>
  );
};

export { BetContext, BetContextProvider };
export type { IBetState };
