
export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type WeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface FrequencyConfig {
  type: FrequencyType;
  days?: WeekDay[]; // only for WEEKLY
  dates?: number[]; // only for MONTHLY, values from 1 to 31
}
export interface LastRunAt {
  description: string; // e.g., "Last execution time"
};

export interface Schedule {
  id: number;
  frequencyConfig: FrequencyConfig;
  timeOfDay: string; // format: "HH:mm"
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  cronExpression: string;
  nextRunAt: string; // ISO date string
  isActive: boolean;
  lastRunAt: LastRunAt; // or possibly null
  timezone: string; // e.g., "America/New_York"
}