export interface Audio{
  id: number;
  name: string;
  filePath: string;
  mimeType: string;
  duration: number; // duration in seconds
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}