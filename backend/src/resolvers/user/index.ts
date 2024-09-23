import { Service } from "typedi";
import UserInformation from "../../schemas/user.js";
import UserService from "../../services/userService.js";
import { Arg, Query, Resolver } from "type-graphql";

@Service()
@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService() // TODO: FIX DI
  }

  @Query(() => UserInformation)
  async getUserData(
    @Arg("accessToken", () => String) accessToken: string,
    @Arg("username", () => String) username: string
  ) {
    return this.userService.getUserData(accessToken, username);
  }
}
