import { createContext, useContext } from "react";
import ActivityStore from "./activity-store";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}