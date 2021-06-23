import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { GetAllOrganizedEventsResponse } from '../models/backend-responses/organizedEvents';
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

const GET_ALL_ORGANIZED_EVENTS: DocumentNode = gql`
  query organizedEvents {
    organizedEvents {
      _id
      eventName
      startDate
      endDate
      description
      organizerId
      category
      eventPassword
      qnaSessionOpen
      createdAt
      updatedAt
    }
  }
`;

const GET_ALL_ORGANIZED_EVENTS_BY_USER: DocumentNode = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      events {
        _id
        eventName
        startDate
        endDate
        description
        organizerId
        category
        eventPassword
        qnaSessionOpen
        createdAt
        updatedAt
      }
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
      refetchQueries: [
        {
          query: GET_ALL_ORGANIZED_EVENTS_BY_USER,
          variables: { _id: organizerId },
        },
      ],
    });
  }

  getAllOrganizedEventsByUser(userId: string): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_ORGANIZED_EVENTS_BY_USER,
      variables: { _id: userId },
    }).valueChanges;
  }

  getAllOrganizedEvents(): Observable<ApolloQueryResult<GetAllOrganizedEventsResponse>> {
    return this.apollo.watchQuery<GetAllOrganizedEventsResponse>({
      query: GET_ALL_ORGANIZED_EVENTS,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }
}
