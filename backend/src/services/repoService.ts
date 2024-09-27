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
    repo: string
  ) {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );

    // const repoData = await axios.get(
    //   `https://api.github.com/repos/${owner}/${repo}`,
    //   {
    //     headers: {
    //       Authorization: `token ${accessToken}`,
    //     },
    //   }
    // );

    // const userData = await axios.get(`https://api.github.com/user/${owner}`, {
    //   headers: {
    //     Authorization: `token ${accessToken}`,
    //   },
    // });

    // prisma.contribution.upsert({
    //   where: {
    //     repoId: repoData.data.id as string,
    //     userId: userData.data.id as string,
    //   },
    //   update: {
    //     commitCount: res.data.filter(
    //       (contributor: any) => contributor.author.login === owner
    //     )[0].total,
    //   },
    //   create: {
    //     repoId: repoData.data.id,
    //     userId: userData.data.id,
    //     commitCount: res.data.filter(
    //       (contributor: any) => contributor.author.login === owner
    //     )[0].total,
    //     claimAmount: 0,
    //   },
    // });

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
}
