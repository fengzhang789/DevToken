import axios from "axios";

export default class RepoService {
  constructor () {}
  
  async getUserRepos(access_key: string) {
    const res = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${access_key}`,
      },
    });

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

      return res.data
    } catch (error) {
      console.error(error);
    }
  }
}