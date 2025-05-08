export enum AnnouncementStatus {
    ONLINE = "online",
    OFFLINE = "offline",
  }
  
  export type Announcement = {
    id: number;
    subject: string;
    text_post: string;
    zone: string;
    devices: string;
    status: AnnouncementStatus;
    Sounds_file: string;
  };