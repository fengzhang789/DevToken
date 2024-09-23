import axios from "axios";

export default class AuthService {
  constructor () {}

  async getGithubAccessCode(code: string) {
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
  }
}