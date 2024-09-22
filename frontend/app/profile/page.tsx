"use client";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import GetGithubAccessKey from "./graphql/getGithubAccessKey.graphql";
import GetUserRepos from "./graphql/getUserRepos.graphql";
import {
  GetGithubAcccessKeyMutation,
  GetGithubAcccessKeyMutationVariables,
  GetUserReposQuery,
  GetUserReposQueryVariables,
} from "../__shared/generated/graphql.types";

const Page = () => {
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const code = useMemo(() => {
    return searchParams.get("code");
  }, [searchParams]);

  const [fetchAccessCode, { data, loading, error }] = useMutation<
    GetGithubAcccessKeyMutation,
    GetGithubAcccessKeyMutationVariables
  >(GetGithubAccessKey);
  const [
    fetchUserRepos,
    { data: repoData, loading: repoLoading, error: repoError, called },
  ] = useLazyQuery<GetUserReposQuery, GetUserReposQueryVariables>(GetUserRepos);

  // FETCH ACCESS TOKEN IF IT DOES NOT EXIST
  useEffect(() => {
    if (code && !loading && !error && !cookies.access_token) {
      fetchAccessCode({
        variables: {
          code: code,
        },
      });
    }
  }, [code]);

  // SET ACCESS TOKEN COOKIE
  useEffect(() => {
    if (data) {
      setCookie("access_token", data.getGithubAccessCode.access_token);
      console.log(data);
    }
  }, [data, setCookie]);

  // FETCH USER REPOSITORIES
  useEffect(() => {
    if (cookies.access_token) {
      fetchUserRepos({
        variables: {
          access_key: cookies.access_token,
        },
      });
    }
  }, [cookies.access_token, fetchUserRepos]);

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>URL</th>
          <th>Owner</th>
        </tr>

        <tbody>
          {repoData &&
            repoData.getUserRepos.map((repo) => {
              return (
                <tr key={repo.html_url}>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                  <td>{repo.html_url}</td>
                  <td>{repo.owner.login}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Page;
