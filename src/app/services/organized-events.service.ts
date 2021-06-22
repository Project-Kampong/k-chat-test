import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { CreateEventDetails } from '../models/data/organizedEvents';

const CREATE_ORGANIZED_EVENT: DocumentNode = gql`
  mutation createOrganizedEvent($createOrganizedEventInput: CreateOrganizedEventInput!) {
    createOrganizedEvent(createOrganizedEventInput: $createOrganizedEventInput) {
      eventName
      startDate
      endDate
      description
      organizerId
      category
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OrganizedEventsService {
  constructor(private apollo: Apollo) {}

  createOrganizedEvent(organizerId: string, fields: CreateEventDetails): Observable<unknown> {
    return this.apollo.mutate({
      mutation: CREATE_ORGANIZED_EVENT,
      variables: {
        createOrganizedEventInput: { organizerId: organizerId, ...fields },
      },
    });
  }
}
