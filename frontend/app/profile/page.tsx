"use client";

import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import ConnectWallet from "../__shared/components/ConnectWallet";
import {
  Body,
  Heading1,
  Heading3,
  LargeBody,
} from "../__shared/components/Headings";
import Table from "../__shared/components/Table";
import { UserInformationContext } from "../__shared/contexts/UserInformationContext";
import {
  GetUserReposQuery,
  GetUserReposQueryVariables,
} from "../__shared/generated/graphql.types";
import getUserRepos from "./graphql/getUserRepos.graphql";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

const Page = () => {
  const [cookies] = useCookies(["access_token"]);

  const { userData } = useContext(UserInformationContext);

  console.log(userData);

  const [fetchUserRepos, { data: repoData }] = useLazyQuery<
    GetUserReposQuery,
    GetUserReposQueryVariables
  >(getUserRepos);

  // FETCH USER REPOSITORIES AND USER DATA
  useEffect(() => {
    if (cookies.access_token) {
      fetchUserRepos({
        variables: {
          access_key: cookies.access_token,
        },
      });
    }
  }, [cookies.access_token, fetchUserRepos]);

  const columns = [
    {
      field: "name",
      headerName: "Repo name",
      renderCell: (params: Record<string, string | number>) => {
        return (
          <Link
            className="underline text-blue-500"
            href={`dashboard/${params.owner}/${params.name}`}
          >
            {params.name}
          </Link>
        );
      },
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
    return "loading...";
  }

  return (
    <section>
      <ConnectWallet />
      <div className="flex flex-row gap-10 h-fit mb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-[50%] h-48"
          src={userData.avatar_url}
          alt="github profile picture"
        />

        <div className="flex flex-col justify-between h-48">
          <div>
            <Heading1 className="pb-4">
              {userData.login} ({userData.name})
            </Heading1>
            <LargeBody>{userData.bio}</LargeBody>
          </div>

          <Body>({userData.public_repos} public repositories)</Body>
        </div>
      </div>

      <Heading3>Repositories</Heading3>

      <Table columns={columns} rows={rows} />
    </section>
  );
};

export default Page;
