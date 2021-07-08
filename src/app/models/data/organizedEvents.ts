export interface CreateEventDetails {
  eventName: string;
  category: string;
  startDate: Date | string;
  endDate: Date | string;
  description: string;
}

export interface UpdateEventDetails {
  eventName: string;
  category: string;
  startDate: Date | string;
  endDate: Date | string;
  description: string;
}

export interface OrganizedEvent {
  category: string;
  createdAt: string;
  description: string;
  endDate: string;
  eventName: string;
  eventPassword: string;
  organizerId: string;
  qnaSessionOpen: boolean;
  startDate: string;
  updatedAt: string;
  __typename: string;
  _id: string;
}
