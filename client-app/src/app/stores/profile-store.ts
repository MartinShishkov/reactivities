import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Profile, Image } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile: boolean = false;
  uploading: boolean = false;
  loading: boolean = false;
  deleting: boolean = false;
  followings: Profile[] = [];
  loadingFollowings: boolean = false;
  // activeTab = 0;

  constructor() {
    makeAutoObservable(this);

    // reaction(
    //   () => this.activeTab,
    //   activeTab => {
    //     if (activeTab === 3 || this.activeTab === 4) {
    //       const predicate = this.activeTab === 3 ? 'followers' : 'following';
    //       this.loadFollowings(predicate);
    //     } else {
    //       this.followings = [];
    //     }
    //   }
    // );
  }

  get isCurrentUser(): boolean {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }

    return false;
  }

  public loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  }

  public uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadImage(file);
      const image = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.images?.push(image);
          
          if (image.isMain && store.userStore.user) {
            store.userStore.setImage(image.url);
            this.profile.image = image.url;
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.uploading = false;
      });
    }
  }

  public setMainImage = async (image: Image) => {
    this.loading = true;

    try {
      await agent.Profiles.setMainImage(image.id);
      store.userStore.setImage(image.url);

      runInAction(() => {
        if (this.profile && this.profile.images) {
          this.profile.images.find(p => p.isMain)!.isMain = false;
          this.profile.images.find(p => p.id === image.id)!.isMain = true;
          this.profile.image = image.url;
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

  public deleteImage = async (image: Image) => {
    if (image.isMain) {
      return;
    }

    this.deleting = true;

    try {
      await agent.Profiles.deleteImage(image.id);

      runInAction(() => {
        if (this.profile && this.profile.images) {
          this.profile.images = this.profile.images.filter(p => p.id !== image.id);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.deleting = false;
      });
    }
  }

  public updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;

    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);

      runInAction(() => {
        if (
          this.profile 
          && this.profile.username !== store.userStore.user?.username
          && this.profile.username === username
        ) {
          following ? this.profile.followersCount++ : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }

        if (this.profile && this.profile.username === store.userStore.user?.username) {
          following ? this.profile.followingCount++ : this.profile.followingCount--;
        }

        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following ? profile.followersCount-- : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
      });

    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  public loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;

    try {
      const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
      runInAction(() => {
        this.followings = followings;
      });

    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingFollowings = false;
      });
    }
  }
}