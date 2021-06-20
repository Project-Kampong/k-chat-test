import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  getUserProfileById(userId: string): Observable<ApolloQueryResult<unknown>> {
    const USER_PROFILE_QUERY: DocumentNode = gql`{
      user (_id: "${userId}") {
        username,
        email
      }
    }`;
    return this.apollo.watchQuery({ query: USER_PROFILE_QUERY }).valueChanges;
  }
}
