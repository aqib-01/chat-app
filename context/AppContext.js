import {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { initialState } from "../state-handling/initialState";
import { reducer } from "../state-handling/reducer";
const Context = createContext();

export const useAppContext = () => {
  return useContext(Context);
};
const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const values = {
    state,
    dispatch,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default AppContext;
