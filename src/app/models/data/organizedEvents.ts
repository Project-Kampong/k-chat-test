export interface CreateEventDetails {
  eventName: string;
  category: string;
  startDate: Date | string;
  endDate: Date | string;
  description: string;
}
