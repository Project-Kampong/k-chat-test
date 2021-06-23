import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { GetAllOrganizedEventsResponse } from '../models/backend-responses/organizedEvents';
import { CreateEventDetails, UpdateEventDetails } from '../models/data/organizedEvents';

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

const UPDATE_ORGANIZED_EVENT: DocumentNode = gql`
  mutation createOrganizedEvent($updateOrganizedEventInput: UpdateOrganizedEventInput!) {
    updateOrganizedEvent(updateOrganizedEventInput: $updateOrganizedEventInput) {
      eventName
      startDate
      endDate
      description
      organizerId
      category
      _id
    }
  }
`;

const REMOVE_ORGANIZED_EVENT: DocumentNode = gql`
  mutation removeOrganizedEvent($_id: String!) {
    removeOrganizedEvent(_id: $_id) {
      _id
    }
  }
`;

const GET_EVENT_BY_ID: DocumentNode = gql`
  query organizedEvent($_id: String!) {
    organizedEvent(_id: $_id) {
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

  removeOrganizedEvent(organizerId: string, eventId: string): Observable<unknown> {
    return this.apollo.mutate({
      mutation: REMOVE_ORGANIZED_EVENT,
      variables: { _id: eventId },
      refetchQueries: [
        {
          query: GET_ALL_ORGANIZED_EVENTS_BY_USER,
          variables: { _id: organizerId },
        },
      ],
    });
  }

  updateOrganizedEvent(organizerId: string, eventId: string, fields: UpdateEventDetails): Observable<unknown> {
    return this.apollo.mutate({
      mutation: UPDATE_ORGANIZED_EVENT,
      variables: {
        updateOrganizedEventInput: { organizerId: organizerId, _id: eventId, ...fields },
      },
      refetchQueries: [
        {
          query: GET_ALL_ORGANIZED_EVENTS_BY_USER,
          variables: { _id: organizerId },
        },
      ],
    });
  }

  getEventById(eventId: string): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery<any>({
      query: GET_EVENT_BY_ID,
      variables: { _id: eventId },
    }).valueChanges;
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
