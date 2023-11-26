import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activities() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
      })
      /* this.activities = activities.map((activity) => ({
        ...activity,
        date: activity.date.split('T')[0]
      })); */
    } catch (error) {
      console.log("loadActivities", error);
    } finally {
      this.setLoadingInitial(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
  }

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    if (id) {
      this.selectActivity(id);
    } else {
      this.clearSelectedActivity();
    }

    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== id)];
        this.activityRegistry.delete(id);

        if (this.selectedActivity?.id === id) {
          this.clearSelectedActivity();
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}