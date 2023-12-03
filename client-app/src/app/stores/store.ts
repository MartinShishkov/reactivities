import { createContext, useContext } from "react";
import ActivityStore from "./activity-store";
import CommonStore from "./common-store";

interface Store {
  activityStore: ActivityStore;
  globalStore: CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  globalStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}