import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  date: Date | null;
  hostUsername?: string;
  host?: Profile;
  attendees: Profile[];
  isGoing: boolean;
  isCancelled: boolean;
  isHost: boolean;
};

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    Object.assign(this, init);
  }
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = '';
  category: string = '';
  description: string = '';
  date: Date | null = null;
  city: string = '';
  venue: string = '';

  constructor(activity?: Activity) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.venue = activity.venue;
      this.city = activity.city
    }
  }
}