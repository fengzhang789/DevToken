import AuthService from "../../services/authService.js";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import Auth from "../../schemas/auth.js";

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  access_token!: string;
}

@Resolver(Auth)
export default class AuthResolver {
  constructor (private readonly authService: AuthService) {
    this.authService = new AuthService()
  }

  @Query(() => String)
  hello() {
    return "Hello, world!";
  }

  @Mutation(() => AuthResponse)
  async getGithubAccessCode(@Arg("code", () => String) code: string) {
    return this.authService.getGithubAccessCode(code)
  }
}
