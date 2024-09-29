"use client";

import { useLazyQuery, useMutation } from "@apollo/client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import {
  GetSelfUserDataQuery,
  GetSelfUserDataQueryVariables,
  LoginOrCreateUserMutation,
  LoginOrCreateUserMutationVariables,
} from "../generated/graphql.types";
import getSelfUserData from "./graphql/getSelfUserData.graphql";
import loginOrCreateUser from "./graphql/loginOrCreateUser.graphql";
import { ethers } from "ethers";

type Props = {
  children: React.ReactNode;
};

export type UserInformationState = {
  accessToken: string;
  metamaskAddress: string;
  setMetamaskAddress: (address: string) => void;
  provider: ethers.BrowserProvider | null;
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.BrowserProvider | null>
  >;
  signer: ethers.JsonRpcSigner | null;
  setSigner: React.Dispatch<React.SetStateAction<ethers.JsonRpcSigner | null>>;
  userData: GetSelfUserDataQuery["getSelfUserData"] | null | undefined;
};

const INITIAL_STATE: UserInformationState = {
  accessToken: "",
  metamaskAddress: "",
  setMetamaskAddress: () => {},
  provider: null,
  setProvider: () => {},
  signer: null,
  setSigner: () => {},
  userData: null,
};

export const UserInformationContext = createContext(INITIAL_STATE);

const UserInformationProvider = ({ children }: Props) => {
  const [cookie, setCookie] = useCookies(["access_token", "metamaskAddress"]);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const [fetchSelfUserData, { data: userData }] = useLazyQuery<
    GetSelfUserDataQuery,
    GetSelfUserDataQueryVariables
  >(getSelfUserData);
  const [createUser] = useMutation<
    LoginOrCreateUserMutation,
    LoginOrCreateUserMutationVariables
  >(loginOrCreateUser);

  const setMetamaskAddress = useCallback(
    (address: string) => {
      setCookie("metamaskAddress", address);
    },
    [setCookie],
  );

  useEffect(() => {
    if (cookie.access_token) {
      fetchSelfUserData({
        variables: {
          accessToken: cookie.access_token,
        },
      });
    }
  }, [cookie.access_token, fetchSelfUserData]);

  useEffect(() => {
    if (
      cookie.access_token &&
      cookie.metamaskAddress &&
      userData?.getSelfUserData.github_id
    ) {
      createUser({
        variables: {
          githubId: parseInt(userData?.getSelfUserData.github_id),
          metamaskAddress: cookie.metamaskAddress,
        },
      });
    }
  }, [
    cookie.access_token,
    cookie.metamaskAddress,
    createUser,
    userData?.getSelfUserData.github_id,
  ]);

  const returnValue: UserInformationState = useMemo(() => {
    return {
      accessToken: cookie.access_token,
      metamaskAddress: cookie.metamaskAddress,
      setMetamaskAddress: setMetamaskAddress,
      provider,
      setProvider,
      signer,
      setSigner,
      userData: userData?.getSelfUserData,
    };
  }, [
    cookie.access_token,
    cookie.metamaskAddress,
    provider,
    setMetamaskAddress,
    signer,
    userData?.getSelfUserData,
  ]);

  return (
    <UserInformationContext.Provider value={returnValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserInformationProvider;
