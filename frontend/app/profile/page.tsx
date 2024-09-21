"use client";

import { gql, useMutation } from '@apollo/client';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

const GET_GITHUB_ACCESS_KEY = gql`
  mutation GithubAcccessKey($code: String!) {
    getGithubAccessCode(code: $code) {
      access_token
    }
  }
`

const Page = () => {
  const searchParams = useSearchParams();
  
  const code = useMemo(() => {
    return searchParams.get("code")
  }, [searchParams])

  const [fetchAccessCode, { data, loading, error }] = useMutation(GET_GITHUB_ACCESS_KEY, {
    variables: {
      code: code,
    }
  })

  useEffect(() => {
    fetchAccessCode()
  }, [fetchAccessCode])

  return (
    <>
      <p>page</p>

      <p>code:</p>
      {data}
    </>
  )
}

export default Page