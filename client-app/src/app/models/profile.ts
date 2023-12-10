import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  images?: Image[]
}

export class Profile implements IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  images?: Image[];

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