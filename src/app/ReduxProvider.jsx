"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store/index";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}