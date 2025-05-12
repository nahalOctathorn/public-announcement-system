import { Zone } from "./zone.type";

export enum DeviceStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type Device = {
  id: number;
  label: string;
  deviceId: string;
  status: DeviceStatus;
  zone: Zone,
  createdAt: string;
  updatedAt: string;
};
