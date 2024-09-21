"use client";

import React from 'react'

const Page = () => {
  const redirectURL = new URL("https://github.com/login/oauth/authorize")
  redirectURL.searchParams.append("client_id", process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "")
  redirectURL.searchParams.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI ?? "")

  if (!process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || !process.env.NEXT_PUBLIC_REDIRECT_URI) {
    return "error"
  }

  return (
    <button onClick={() => {
      window.open(redirectURL.toString())
    }}>page</button>
  )
}

export default Page