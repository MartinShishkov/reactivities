import { createContext, useContext } from "react";
import ActivityStore from "./activity-store";
import CommonStore from "./common-store";
import UserStore from "./user-store";
import ModalStore from "./modal-store";

interface Store {
  activityStore: ActivityStore;
  globalStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  globalStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}