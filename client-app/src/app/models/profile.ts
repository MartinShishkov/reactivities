import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  images?: Image[],
  followersCount: number;
  followingCount: number;
  following: boolean;
}

export class Profile implements IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  images?: Image[];
  followersCount: number = 0;
  followingCount: number = 0;
  following: boolean = false;

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export interface Image {
  id: string;
  url: string;
  isMain: boolean;
}