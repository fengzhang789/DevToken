import { Arg, Query, Resolver } from "type-graphql";
import {
  RepositoryContributorInformation,
  RepositoryInformation,
} from "../../schemas/repository.js";
import RepoService from "../../services/repoService.js";

@Resolver()
export default class RepoResolver {
  constructor(private readonly repoService: RepoService) {
    this.repoService = new RepoService();
  }

  @Query(() => [RepositoryInformation])
  async getUserRepos(
    @Arg("access_key", () => String) access_key: string
  ): Promise<RepositoryInformation[]> {
    return this.repoService.getUserRepos(access_key);
  }

  @Query(() => String)
  async getOrganizationRepos(
    @Arg("access_key", () => String) access_key: string,
    @Arg("organization", () => String) organization: string
  ) {}

  @Query(() => [RepositoryContributorInformation])
  async getRepoContributorStats(
    @Arg("accessToken", () => String) accessToken: string,
    @Arg("owner", () => String) owner: string,
    @Arg("repo", () => String) repo: string
  ) {
    return this.repoService.getRepoContributorStats(accessToken, owner, repo)
  }
}
