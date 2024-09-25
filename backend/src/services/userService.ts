import axios from "axios"
import { Service } from "typedi"

@Service()
export default class UserService {
  constructor () {}

  async getUserData(accessToken: string, username: string) {
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    })

    console.log(res.data)

    return {
      login: res.data.login,
      avatar_url: res.data.avatar_url,
      html_url: res.data.html_url,
      name: res.data.name,
      bio: res.data.bio,
      public_repos: res.data.public_repos,
      github_created_at: res.data.created_at,
      github_updated_at: res.data.updated_at,
      github_id: res.data.id,
    }
  }

  async getSelfUserData(accessToken: string) {
    const res = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    })

    console.log(res.data)

    return {
      login: res.data.login,
      avatar_url: res.data.avatar_url,
      html_url: res.data.html_url,
      name: res.data.name,
      bio: res.data.bio,
      public_repos: res.data.public_repos,
      github_created_at: res.data.created_at,
      github_updated_at: res.data.updated_at,
      github_id: res.data.id,
    }
  }
}