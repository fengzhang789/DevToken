import { Resolver, Query } from "type-graphql";
import DevTokenABIService from "../../services/devTokenABIService.js";

@Resolver()
export default class DevTokenABIResolver {
  constructor(private readonly devTokenABIService: DevTokenABIService) {
    this.devTokenABIService = new DevTokenABIService();
  }

  @Query(() => String)
  async getDevTokenABI(): Promise<any> {
    const json = await this.devTokenABIService.getDevTokenABI()
    return JSON.stringify(json.abi);
  }
}