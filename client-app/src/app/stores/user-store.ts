import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  public login = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.globalStore.setToken(user.token);

      runInAction(() => {
        this.user = user;
      });

      router.navigate('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error 
    }
  }

  public register = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.register(credentials);
      store.globalStore.setToken(user.token);

      runInAction(() => {
        this.user = user;
      });

      router.navigate('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error 
    }
  }

  public logout = () => {
    store.globalStore.setToken(null);
    this.user = null;
    router.navigate('/');
  }

  public getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      throw error;
    }
  }
}