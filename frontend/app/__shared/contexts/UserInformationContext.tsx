"use client";

import { useLazyQuery } from "@apollo/client";
import React, { createContext, useCallback, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import {
  GetSelfUserDataQuery,
  GetSelfUserDataQueryVariables,
} from "../generated/graphql.types";
import getSelfUserData from "./graphql/getSelfUserData.graphql";

type Props = {
  children: React.ReactNode;
};

export type UserInformationState = {
  accessToken: string;
  metamaskAddress: string;
  setMetamaskAddress: (address: string) => void;
  userData: GetSelfUserDataQuery["getSelfUserData"] | null | undefined;
};

const INITIAL_STATE: UserInformationState = {
  accessToken: "",
  metamaskAddress: "",
  setMetamaskAddress: () => {},
  userData: null,
};

export const UserInformationContext = createContext(INITIAL_STATE);

const UserInformationProvider = ({ children }: Props) => {
  const [cookie, setCookie] = useCookies(["access_token", "metamaskAddress"]);

  const [fetchSelfUserData, { data: userData }] = useLazyQuery<
    GetSelfUserDataQuery,
    GetSelfUserDataQueryVariables
  >(getSelfUserData);

  const setMetamaskAddress = useCallback((address: string) => {
    setCookie("metamaskAddress", address);
  }, [setCookie]);

  useEffect(() => {
    if (cookie.access_token) {
      fetchSelfUserData({
        variables: {
          accessToken: cookie.access_token,
        },
      });
    }
  }, [cookie.access_token, fetchSelfUserData]);

  const returnValue: UserInformationState = useMemo(() => {
    return {
      accessToken: cookie.access_token,
      metamaskAddress: cookie.metamaskAddress,
      setMetamaskAddress: setMetamaskAddress,
      userData: userData?.getSelfUserData,
    };
  }, [cookie.access_token, cookie.metamaskAddress, setMetamaskAddress, userData?.getSelfUserData]);

  return (
    <UserInformationContext.Provider value={returnValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserInformationProvider;
