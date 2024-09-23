import { RepositoryInformation } from "$src/schemas/repository.js";
import RepoService from "$src/services/repoService.js";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class RepoResolver {
  constructor (private readonly repoService: RepoService) {}

  @Query(() => [RepositoryInformation])
  async getUserRepos(
    @Arg("access_key", () => String) access_key: string
  ): Promise<RepositoryInformation[]> {
    return this.repoService.getUserRepos(access_key)
  }

  @Query(() => String)
  async getOrganizationRepos(
    @Arg("access_key", () => String) access_key: string,
    @Arg("organization", () => String) organization: string
  ) {
    
  }
}
