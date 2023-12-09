import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
}

export class Profile implements IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}