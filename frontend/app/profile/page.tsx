"use client";

import { gql, useMutation } from '@apollo/client';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useCookies } from 'react-cookie';

const GET_GITHUB_ACCESS_KEY = gql`
  mutation GithubAcccessKey($code: String!) {
    getGithubAccessCode(code: $code) {
      access_token
    }
  }
`

const Page = () => {
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies(['access_token'])
  
  const code = useMemo(() => {
    return searchParams.get("code")
  }, [searchParams])

  const [fetchAccessCode, { data, loading, error }] = useMutation(GET_GITHUB_ACCESS_KEY)

  useEffect(() => {
    if (code && !loading && !error && !cookies.access_token) {
      fetchAccessCode({
        variables: {
          code: code
        }
      })
    }
  }, [code])

  useEffect(() => {
    if (data) {
      setCookie("access_token", data.getGithubAccessCode.access_token)
      console.log(data)
    }
  }, [data, setCookie])

  return (
    <>
      <p>page</p>

      <p>code:</p>
      {data && data.getGithubAccessCode.access_token}
    </>
  )
}

export default Page