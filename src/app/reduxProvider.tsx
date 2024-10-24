"use client"; // Make sure it's a client-side component

import { Provider } from "react-redux";
import store from "./redux/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
