import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { GetUserProfileByIdResponse } from '../models/backend-responses/profile';
import { UserProfileDetails } from '../models/data/profile';

const USER_PROFILE_BY_ID: DocumentNode = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      username
      email
      name
      gender
      dob
      occupation
      profilePicture
    }
  }
`;

const USER_PROFILE_MUTATION: DocumentNode = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      name
      gender
      profilePicture
      dob
      occupation
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  //Cache Data may be lost here, need to merge with existing query in organized events service
  getUserProfileById(userId: string): Observable<ApolloQueryResult<GetUserProfileByIdResponse>> {
    return this.apollo.watchQuery<GetUserProfileByIdResponse>({
      query: USER_PROFILE_BY_ID,
      variables: { _id: userId },
    }).valueChanges;
  }

  updateUserProfileById(userId: string, fields: UserProfileDetails): Observable<unknown> {
    return this.apollo.mutate({
      mutation: USER_PROFILE_MUTATION,
      variables: {
        updateUserInput: { _id: userId, ...fields },
      },
      refetchQueries: [
        {
          query: USER_PROFILE_BY_ID,
          variables: { _id: userId },
        },
      ],
    });
  }
}
