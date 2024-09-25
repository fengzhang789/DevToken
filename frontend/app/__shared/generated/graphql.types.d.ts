import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  getGithubAccessCode: AuthResponse;
};


export type MutationGetGithubAccessCodeArgs = {
  code: Scalars['String']['input'];
};

export type Owner = {
  __typename?: 'Owner';
  avatar_url: Scalars['String']['output'];
  login: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getOrganizationRepos: Scalars['String']['output'];
  getRepoContributorStats: Array<RepositoryContributorInformation>;
  getSelfUserData: UserInformation;
  getUserData: UserInformation;
  getUserRepos: Array<RepositoryInformation>;
  hello: Scalars['String']['output'];
};


export type QueryGetOrganizationReposArgs = {
  access_key: Scalars['String']['input'];
  organization: Scalars['String']['input'];
};


export type QueryGetRepoContributorStatsArgs = {
  accessToken: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  repo: Scalars['String']['input'];
};


export type QueryGetSelfUserDataArgs = {
  accessToken: Scalars['String']['input'];
};


export type QueryGetUserDataArgs = {
  accessToken: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetUserReposArgs = {
  access_key: Scalars['String']['input'];
};

export type RepositoryContributorInformation = {
  __typename?: 'RepositoryContributorInformation';
  avatar_url: Scalars['String']['output'];
  html_url: Scalars['String']['output'];
  login: Scalars['String']['output'];
  total: Scalars['Float']['output'];
};

export type RepositoryInformation = {
  __typename?: 'RepositoryInformation';
  description?: Maybe<Scalars['String']['output']>;
  full_name: Scalars['String']['output'];
  html_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner: Owner;
};

export type UserInformation = {
  __typename?: 'UserInformation';
  avatar_url: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  github_created_at: Scalars['String']['output'];
  github_id: Scalars['String']['output'];
  github_updated_at: Scalars['String']['output'];
  html_url: Scalars['String']['output'];
  login: Scalars['String']['output'];
  name: Scalars['String']['output'];
  public_repos: Scalars['String']['output'];
};

export type GetSelfUserDataQueryVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type GetSelfUserDataQuery = { __typename?: 'Query', getSelfUserData: { __typename?: 'UserInformation', avatar_url: string, bio: string, login: string, html_url: string, name: string, public_repos: string, github_created_at: string, github_updated_at: string } };

export type GetRepositoryContributionsQueryVariables = Exact<{
  repo: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  accessToken: Scalars['String']['input'];
}>;


export type GetRepositoryContributionsQuery = { __typename?: 'Query', getRepoContributorStats: Array<{ __typename?: 'RepositoryContributorInformation', total: number, login: string, avatar_url: string, html_url: string }> };

export type GetUserReposQueryVariables = Exact<{
  access_key: Scalars['String']['input'];
}>;


export type GetUserReposQuery = { __typename?: 'Query', getUserRepos: Array<{ __typename?: 'RepositoryInformation', description?: string | null, full_name: string, html_url: string, name: string, owner: { __typename?: 'Owner', avatar_url: string, login: string } }> };

export type GetGithubAcccessKeyMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GetGithubAcccessKeyMutation = { __typename?: 'Mutation', getGithubAccessCode: { __typename?: 'AuthResponse', access_token?: string | null } };


export const GetSelfUserDataDocument = gql`
    query getSelfUserData($accessToken: String!) {
  getSelfUserData(accessToken: $accessToken) {
    avatar_url
    bio
    login
    html_url
    name
    public_repos
    github_created_at
    github_updated_at
  }
}
    `;

/**
 * __useGetSelfUserDataQuery__
 *
 * To run a query within a React component, call `useGetSelfUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelfUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelfUserDataQuery({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useGetSelfUserDataQuery(baseOptions: Apollo.QueryHookOptions<GetSelfUserDataQuery, GetSelfUserDataQueryVariables> & ({ variables: GetSelfUserDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>(GetSelfUserDataDocument, options);
      }
export function useGetSelfUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>(GetSelfUserDataDocument, options);
        }
export function useGetSelfUserDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>(GetSelfUserDataDocument, options);
        }
export type GetSelfUserDataQueryHookResult = ReturnType<typeof useGetSelfUserDataQuery>;
export type GetSelfUserDataLazyQueryHookResult = ReturnType<typeof useGetSelfUserDataLazyQuery>;
export type GetSelfUserDataSuspenseQueryHookResult = ReturnType<typeof useGetSelfUserDataSuspenseQuery>;
export type GetSelfUserDataQueryResult = Apollo.QueryResult<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>;
export const GetRepositoryContributionsDocument = gql`
    query getRepositoryContributions($repo: String!, $owner: String!, $accessToken: String!) {
  getRepoContributorStats(repo: $repo, owner: $owner, accessToken: $accessToken) {
    total
    login
    avatar_url
    html_url
  }
}
    `;

/**
 * __useGetRepositoryContributionsQuery__
 *
 * To run a query within a React component, call `useGetRepositoryContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoryContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoryContributionsQuery({
 *   variables: {
 *      repo: // value for 'repo'
 *      owner: // value for 'owner'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useGetRepositoryContributionsQuery(baseOptions: Apollo.QueryHookOptions<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables> & ({ variables: GetRepositoryContributionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>(GetRepositoryContributionsDocument, options);
      }
export function useGetRepositoryContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>(GetRepositoryContributionsDocument, options);
        }
export function useGetRepositoryContributionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>(GetRepositoryContributionsDocument, options);
        }
export type GetRepositoryContributionsQueryHookResult = ReturnType<typeof useGetRepositoryContributionsQuery>;
export type GetRepositoryContributionsLazyQueryHookResult = ReturnType<typeof useGetRepositoryContributionsLazyQuery>;
export type GetRepositoryContributionsSuspenseQueryHookResult = ReturnType<typeof useGetRepositoryContributionsSuspenseQuery>;
export type GetRepositoryContributionsQueryResult = Apollo.QueryResult<GetRepositoryContributionsQuery, GetRepositoryContributionsQueryVariables>;
export const GetUserReposDocument = gql`
    query getUserRepos($access_key: String!) {
  getUserRepos(access_key: $access_key) {
    description
    full_name
    html_url
    name
    owner {
      avatar_url
      login
    }
  }
}
    `;

/**
 * __useGetUserReposQuery__
 *
 * To run a query within a React component, call `useGetUserReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserReposQuery({
 *   variables: {
 *      access_key: // value for 'access_key'
 *   },
 * });
 */
export function useGetUserReposQuery(baseOptions: Apollo.QueryHookOptions<GetUserReposQuery, GetUserReposQueryVariables> & ({ variables: GetUserReposQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserReposQuery, GetUserReposQueryVariables>(GetUserReposDocument, options);
      }
export function useGetUserReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserReposQuery, GetUserReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserReposQuery, GetUserReposQueryVariables>(GetUserReposDocument, options);
        }
export function useGetUserReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserReposQuery, GetUserReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserReposQuery, GetUserReposQueryVariables>(GetUserReposDocument, options);
        }
export type GetUserReposQueryHookResult = ReturnType<typeof useGetUserReposQuery>;
export type GetUserReposLazyQueryHookResult = ReturnType<typeof useGetUserReposLazyQuery>;
export type GetUserReposSuspenseQueryHookResult = ReturnType<typeof useGetUserReposSuspenseQuery>;
export type GetUserReposQueryResult = Apollo.QueryResult<GetUserReposQuery, GetUserReposQueryVariables>;
export const GetGithubAcccessKeyDocument = gql`
    mutation getGithubAcccessKey($code: String!) {
  getGithubAccessCode(code: $code) {
    access_token
  }
}
    `;
export type GetGithubAcccessKeyMutationFn = Apollo.MutationFunction<GetGithubAcccessKeyMutation, GetGithubAcccessKeyMutationVariables>;

/**
 * __useGetGithubAcccessKeyMutation__
 *
 * To run a mutation, you first call `useGetGithubAcccessKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetGithubAcccessKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getGithubAcccessKeyMutation, { data, loading, error }] = useGetGithubAcccessKeyMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetGithubAcccessKeyMutation(baseOptions?: Apollo.MutationHookOptions<GetGithubAcccessKeyMutation, GetGithubAcccessKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetGithubAcccessKeyMutation, GetGithubAcccessKeyMutationVariables>(GetGithubAcccessKeyDocument, options);
      }
export type GetGithubAcccessKeyMutationHookResult = ReturnType<typeof useGetGithubAcccessKeyMutation>;
export type GetGithubAcccessKeyMutationResult = Apollo.MutationResult<GetGithubAcccessKeyMutation>;
export type GetGithubAcccessKeyMutationOptions = Apollo.BaseMutationOptions<GetGithubAcccessKeyMutation, GetGithubAcccessKeyMutationVariables>;