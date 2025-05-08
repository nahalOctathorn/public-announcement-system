import { User } from "./user.type";

export enum DeviceStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type Device = {
  id: number;
  name: string;
  zone: string;
  status: DeviceStatus;
};

// export type DeviceData = Omit<Device, "id" | "createdAt" | "updatedAt"> & {
// };

// export type DeviceDetail = {
//   id: number;
//   sn: string;
//   patentName: string;
//   level?: string;
//   allTime?: string;
//   endTime?: string;
//   useTime?: string;
//   modeType?: string;
//   timeZone?: string;
//   levelLogs?: string;
//   modeIndex?: string;
//   startTime?: string;
//   deviceName?: string;
//   mobileInfo?: string;
// };

// export type DeviceDetailData = {
//   id: number;
//   data: Omit<DeviceDetail, "id">;
//   filename: string;
//   serial: string;
//   timeStamps: string;
//   device?: Device;
// };
