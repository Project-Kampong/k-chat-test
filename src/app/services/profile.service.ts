import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { GetUserProfileByIdResponse } from '../models/backend-responses/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  getUserProfileById(userId: string): Observable<ApolloQueryResult<GetUserProfileByIdResponse>> {
    const USER_PROFILE_QUERY: DocumentNode = gql`{
      user (_id: "${userId}") {
        username,
        email,
        name,
        gender,
        dob,
        occupation
      }
    }`;
    return this.apollo.watchQuery<GetUserProfileByIdResponse>({ query: USER_PROFILE_QUERY }).valueChanges;
  }
}
