import { Audio } from "./audio.type";
import { Device } from "./device.type";
import { Schedule } from "./schedule.type";

export enum AnnouncementStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type AnnouncementType = " GERNERAL" | "LIVE" | "SOS" | "PRAYER" | "SCHEDULED"

export interface Announcement {
  id: number;
  name: string;
  description: string;
  type: AnnouncementType;
  audio: Audio;
  devices: Device[];
  schedule: Schedule;
  delay: number; // in milliseconds or seconds — clarify if needed
  allDevices: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}