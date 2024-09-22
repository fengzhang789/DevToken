import { RepositoryInformation } from "$src/schemas/repository.js";
import axios from "axios";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class RepoResolver {
  @Query(() => [RepositoryInformation])
  async getUserRepos(
    @Arg("access_key", () => String) access_key: string
  ): Promise<RepositoryInformation[]> {
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

  @Query(() => String)
  async getOrganizationRepos(
    @Arg("access_key", () => String) access_key: string,
    @Arg("organization", () => String) organization: string
  ) {
    try {
      const res = await axios.get(
        `https://api.github.com/orgs/${organization}/repos`,
        {
          headers: {
            Authorization: `token ${access_key}`,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
}
