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
