"use client";

import { Body, Heading2 } from "@/app/__shared/components/Headings";
import Table, { TableColumnInput } from "@/app/__shared/components/Table";
import {
  GetRepositoryContributionsQuery,
  GetRepositoryContributionsQueryVariables,
  GetSelfRepoContributionStatsQuery,
  GetSelfRepoContributionStatsQueryVariables,
  GetUserRepoQuery,
  GetUserRepoQueryVariables,
} from "@/app/__shared/generated/graphql.types";
import { useQuery } from "@apollo/client";
import { useCallback, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import getRepositoryContributions from "./graphql/getRepositoryContributions.graphql";
import getUserRepo from "./graphql/getUserRepo.graphql";
import Link from "next/link";
import { UserInformationContext } from "@/app/__shared/contexts/UserInformationContext";
import getSelfRepoContributionStats from "./graphql/getSelfRepoContributionStats.graphql";
import Button from "@/app/__shared/components/Button";

const Page = ({
  params,
}: {
  params: {
    owner: string;
    repo: string;
  };
}) => {
  const [cookie] = useCookies(["access_token"]);
  const { userData } = useContext(UserInformationContext);

  // REPOSITORY DATA
  const { data: repoData, loading: repoLoading } = useQuery<
    GetUserRepoQuery,
    GetUserRepoQueryVariables
  >(getUserRepo, {
    variables: {
      accessKey: cookie.access_token,
      owner: params.owner,
      repo: params.repo,
    },
  });

  // REPOSITORY CONTRIBUTIONS DATA
  const {
    data: repoContributionData,
    loading: contributionLoading,
    stopPolling,
  } = useQuery<
    GetRepositoryContributionsQuery,
    GetRepositoryContributionsQueryVariables
  >(getRepositoryContributions, {
    variables: {
      accessToken: cookie.access_token,
      owner: params.owner,
      repo: params.repo,
      repoId: repoData?.getUserRepo.repo_id ?? 0,
      githubId: parseInt(userData?.github_id ?? "0"),
    },
    skip: !repoData?.getUserRepo.repo_id || !userData?.github_id,
    pollInterval: 8000,
    onCompleted: (data) => {
      if (data) {
        stopPolling();
      }
    },
  });

  // SELF REPO CONTRIBUTION DATA
  const { data: selfRepoContributionData } = useQuery<
    GetSelfRepoContributionStatsQuery,
    GetSelfRepoContributionStatsQueryVariables
  >(getSelfRepoContributionStats, {
    variables: {
      repoId: repoData?.getUserRepo.repo_id ?? 0,
      githubId: parseInt(userData?.github_id ?? "0"),
    },
    skip:
      !repoData?.getUserRepo.repo_id ||
      !userData?.github_id ||
      !repoContributionData?.getRepoContributorStats,
  });

  const canClaim: boolean = useMemo(() => {
    const contributionStats =
      selfRepoContributionData?.getSelfRepoContributionStats;

    if (contributionStats) {
      return contributionStats.commitCount - contributionStats.claimAmount >= 5;
    } else {
      return false;
    }
  }, [selfRepoContributionData]);

  const claimTokens = useCallback(() => {}, []);

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
            <Link href={params.html_url as string} target="_blank">
              <Body className="font-medium underline text-blue-500">
                {params.name}
              </Body>
            </Link>
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
          html_url: data.html_url,
        };
      });
    } else {
      return [];
    }
  }, [repoContributionData]);

  if (repoLoading || contributionLoading || !repoContributionData) {
    return "loading...";
  }

  return (
    <div>
      <Heading2>{params.repo} Repository Contribution Leaderboard</Heading2>

      <Button disabled={canClaim}>Claim 5 DevTokens</Button>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default Page;
