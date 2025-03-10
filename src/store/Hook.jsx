import { useContext } from "react";
import { StoreProviderContext } from "./Context";

export const useStore = () => {
  return useContext(StoreProviderContext);
};
