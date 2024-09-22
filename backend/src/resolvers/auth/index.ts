import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import Auth from "../../schemas/auth.js";
import axios from 'axios'

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  access_token!: string;
}

@Resolver(Auth)
export default class AuthResolver {
  constructor () {}

  @Query(() => String)
  hello() {
    return "Hello, world!";
  }

  @Mutation(() => AuthResponse)
  async getGithubAccessCode(@Arg("code", () => String) code: string) {
    try {
      const requestURL = new URL("https://github.com/login/oauth/access_token")

      requestURL.searchParams.append("client_id", process.env.GITHUB_CLIENT_ID ?? "");
      requestURL.searchParams.append("client_secret", process.env.GITHUB_CLIENT_SECRET ?? "");
      requestURL.searchParams.append("code", code)

      const req = await axios.post(requestURL.toString())
      const parameters = new URLSearchParams(req.data);
      const access_token = parameters.get("access_token");

      console.log("ACCESS TOKEN:", access_token)

      return {
        access_token
      }
      
    } catch {
      return "Error";
    }
  }
}
