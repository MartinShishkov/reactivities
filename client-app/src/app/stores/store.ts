import { createContext, useContext } from "react";
import ActivityStore from "./activity-store";
import CommonStore from "./common-store";
import UserStore from "./user-store";
import ModalStore from "./modal-store";
import ProfileStore from "./profile-store";

interface Store {
  activityStore: ActivityStore;
  globalStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  globalStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}