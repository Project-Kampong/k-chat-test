import { FormControl } from '@angular/forms';

export const CreateEventForm = {
  eventName: new FormControl(''),
  category: new FormControl(''),
  startDate: new FormControl(''),
  endDate: new FormControl(''),
  description: new FormControl(''),
};

export const EditEventForm = {
  eventName: new FormControl(''),
  category: new FormControl(''),
  startDate: new FormControl(''),
  endDate: new FormControl(''),
  description: new FormControl(''),
};
