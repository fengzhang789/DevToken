"use client";

import { Body, Heading2 } from "@/app/__shared/components/Headings";
import Table, { TableColumnInput } from "@/app/__shared/components/Table";
import {
  GetRepositoryContributionsQuery,
  GetRepositoryContributionsQueryVariables,
} from "@/app/__shared/generated/graphql.types";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import getRepositoryContributions from "./graphql/getRepositoryContributions.graphql";

const Page = ({
  params,
}: {
  params: {
    owner: string;
    repo: string;
  };
}) => {
  const [cookie] = useCookies(["access_token"]);

  const { data: repoContributionData, loading } = useQuery<
    GetRepositoryContributionsQuery,
    GetRepositoryContributionsQueryVariables
  >(getRepositoryContributions, {
    variables: {
      accessToken: cookie.access_token,
      owner: params.owner,
      repo: params.repo,
    },
    pollInterval: 1000,
  });

  console.log(repoContributionData?.getRepoContributorStats);

  const columns: TableColumnInput = [
    {
      field: "name",
      headerName: "User",
      renderCell: (params) => {
        return (
          <div className="flex flex-row gap-2 items-center pr-4 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="rounded-full h-10"
              src={params.avatar_url as string}
              alt="Github user profile"
            />
            <Body className="font-medium">{params.name}</Body>
          </div>
        );
      },
    },
    {
      field: "totalContributions",
      headerName: "Number of Contributions",
    },
  ];

  const rows = useMemo(() => {
    if (repoContributionData?.getRepoContributorStats) {
      const sortedData = [...repoContributionData.getRepoContributorStats].sort(
        (a, b) => b.total - a.total,
      );

      return sortedData.map((data) => {
        return {
          name: data.login,
          totalContributions: data.total,
          avatar_url: data.avatar_url,
        };
      });
    } else {
      return [];
    }
  }, [repoContributionData]);

  if (loading || !repoContributionData) {
    return "loading...";
  }

  return (
    <div>
      <Heading2>{params.repo} Repository Contribution Leaderboard</Heading2>

      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default Page;
