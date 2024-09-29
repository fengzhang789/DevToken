import prisma from "../prisma.js";
import axios from "axios";
import { Service } from "typedi";

@Service()
export default class RepoService {
  constructor() {}

  async getUserRepos(access_key: string) {
    const res = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${access_key}`,
      },
    });

    console.log(res.data);

    return res.data.map((repo: any) => ({
      name: repo.name,
      full_name: repo.full_name,
      repo_id: repo.id,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
      html_url: repo.html_url,
      description: repo.description,
    }));
  }

  async getUserRepo(access_key: string, owner: string, repo: string) {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `token ${access_key}`,
        },
      }
    );

    return {
      name: res.data.name,
      full_name: res.data.full_name,
      repo_id: res.data.id,
      owner: {
        login: res.data.owner.login,
        avatar_url: res.data.owner.avatar_url,
      },
      html_url: res.data.html_url,
      description: res.data.description,
    };
  }

  async getOrganizationRepos(access_key: string, organization: string) {
    try {
      const res = await axios.get(
        `https://api.github.com/orgs/${organization}/repos`,
        {
          headers: {
            Authorization: `token ${access_key}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRepoContributorStats(
    accessToken: string,
    owner: string,
    repo: string,
    repoId: number,
    githubId: number
  ) {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );

    console.log(res.data)

    const commitCount = res.data.filter((contributor: { author: { login: string } }) => {
      return contributor.author.login === owner;
    })[0].total;

    await prisma.contribution.upsert({
      where: {
        repoId: repoId,
      },
      update: {
        commitCount: commitCount
      },
      create: {
        repoId: repoId,
        githubId: githubId,
        commitCount: commitCount,
        claimAmount: 0,
      },
    })

    return res.data.map(
      (contributor: {
        total: number;
        author: {
          login: string;
          avatar_url: string;
          html_url: string;
        };
      }) => {
        return {
          total: contributor.total,
          login: contributor.author.login,
          avatar_url: contributor.author.avatar_url,
          html_url: contributor.author.html_url,
        };
      }
    );
  }

  async getSelfRepoContributionStats(repoId: number, githubId: number) {
    const res = await prisma.contribution.findFirst({
      where: {
        repoId: repoId,
        githubId: githubId,
      },
    });

    console.log(res);

    return res;
  }
}
