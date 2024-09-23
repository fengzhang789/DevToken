"use client";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import getGithubAccessKey from "./graphql/getGithubAccessKey.graphql";
import getUserRepos from "./graphql/getUserRepos.graphql";
import getSelfUserData from "./graphql/getSelfUserData.graphql"
import {
  GetGithubAcccessKeyMutation,
  GetGithubAcccessKeyMutationVariables,
  GetSelfUserDataQuery,
  GetSelfUserDataQueryVariables,
  GetUserReposQuery,
  GetUserReposQueryVariables,
} from "../__shared/generated/graphql.types";
import Table from "../__shared/components/Table";
import Image from "next/image";

const Page = () => {
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const code = useMemo(() => {
    return searchParams.get("code");
  }, [searchParams]);

  const [fetchAccessCode, { data, loading, error, called: accessCodeCalled }] =
    useMutation<
      GetGithubAcccessKeyMutation,
      GetGithubAcccessKeyMutationVariables
    >(getGithubAccessKey);
  const [
    fetchUserRepos,
    { data: repoData },
  ] = useLazyQuery<GetUserReposQuery, GetUserReposQueryVariables>(getUserRepos);
  const [
    fetchSelfUserData,
    { data: userData },
  ] = useLazyQuery<GetSelfUserDataQuery, GetSelfUserDataQueryVariables>(getSelfUserData)

  // FETCH ACCESS TOKEN IF IT DOES NOT EXIST
  useEffect(() => {
    if (code && !loading && !error && !cookies.access_token) {
      if (!accessCodeCalled) {
        fetchAccessCode({
          variables: {
            code: code,
          },
        });
      }
    }
  }, [
    code,
    loading,
    error,
    cookies.access_token,
    fetchAccessCode,
    accessCodeCalled,
  ]);

  // SET ACCESS TOKEN COOKIE
  useEffect(() => {
    if (data) {
      setCookie("access_token", data.getGithubAccessCode.access_token);
      console.log(data);
    }
  }, [data, setCookie]);

  // FETCH USER REPOSITORIES AND USER DATA
  useEffect(() => {
    if (cookies.access_token) {
      fetchUserRepos({
        variables: {
          access_key: cookies.access_token,
        },
      });
      fetchSelfUserData({
        variables: {
          accessToken: cookies.access_token,
        }
      })
    }
  }, [cookies.access_token, fetchUserRepos, fetchSelfUserData]);
  
  const columns = [
    {
      field: "name",
      headerName: "Repo name",
    },
    {
      field: "url",
      headerName: "URL",
    },
    {
      field: "owner",
      headerName: "Owner username",
    },
  ];

  const rows =
    repoData?.getUserRepos.map((repo) => {
      return {
        name: repo.name,
        url: repo.html_url,
        owner: repo.owner.login,
      };
    }) ?? [];

  if (!userData || !repoData) {
    return "loading..."
  }

  return (
    <>
      <h1>{userData.getSelfUserData.name}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-[50%] h-48" src={userData.getSelfUserData.avatar_url} alt="github profile picture" />

      {userData.getSelfUserData.bio}

      <h1>{userData.getSelfUserData.login}</h1>

      <h1>{userData.getSelfUserData.public_repos} public repositories</h1>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default Page;
