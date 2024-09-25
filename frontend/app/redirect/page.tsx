"use client";

import { useMutation } from '@apollo/client';
import { Heading3 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { GetGithubAcccessKeyMutation, GetGithubAcccessKeyMutationVariables } from '../__shared/generated/graphql.types';
import getGithubAccessKey from "./graphql/getGithubAccessKey.graphql";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const code = useMemo(() => {
    return searchParams.get("code");
  }, [searchParams]);

  const [fetchAccessCode, { data, called: accessCodeCalled }] =
    useMutation<
      GetGithubAcccessKeyMutation,
      GetGithubAcccessKeyMutationVariables
    >(getGithubAccessKey);

  // FETCH ACCESS TOKEN IF IT DOES NOT EXIST
  useEffect(() => {
    if (code && !cookies.access_token) {
      if (!accessCodeCalled) {
        fetchAccessCode({
          variables: {
            code: code,
          },
        });
      }
    } else if (cookies.access_token !== null) {
      router.push("/profile")
    }
  }, [
    code,
    cookies.access_token,
    fetchAccessCode,
    accessCodeCalled,
    router
  ]);

  // SET ACCESS TOKEN COOKIE AND REDIRECT TO PROFILE
  useEffect(() => {
    if (data && data.getGithubAccessCode.access_token !== null) {
      setCookie("access_token", data.getGithubAccessCode.access_token);
      router.push("/profile")
    }
  }, [data, setCookie, router]);

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Heading3>Redirecting you...</Heading3>
    </div>
  )
}

export default Page