import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie';

type Props = {
  children: React.ReactNode;
}

export type UserInformationState = {
  accessToken: string;
  metamaskAddress: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  setMetamaskAddress: React.Dispatch<React.SetStateAction<string>>
}

const INITIAL_STATE: UserInformationState = {
  accessToken: "",
  metamaskAddress: "",
  setAccessToken: () => {},
  setMetamaskAddress: () => {},
}

export const UserInformationContext = createContext(INITIAL_STATE);

const UserInformationProvider = ({ children }: Props) => {
  const [cookie, setCookie] = useCookies(["access_token"])
  const [accessToken, setAccessToken] = useState<string>("");
  const [metamaskAddress, setMetamaskAddress] = useState<string>("");


  // IF COOKIE OF ACCESS TOKEN EXISTS, SET ACCESS TOKEN TO IT
  useEffect(() => {
    if (cookie.access_token !== null) {
      setAccessToken(cookie.access_token)
    }
  }, [])

  // UPDATE COOKIE IF ACCESS TOKEN CHANGES
  useEffect(() => {
    if (accessToken !== null) {
      setCookie("access_token", accessToken)
    }
  }, [accessToken, setCookie])

  const returnValue: UserInformationState = useMemo(() => {
    return {
      accessToken: accessToken,
      metamaskAddress: metamaskAddress,
      setAccessToken: setAccessToken,
      setMetamaskAddress: setMetamaskAddress,
    }
  }, [accessToken, metamaskAddress, setAccessToken, setMetamaskAddress])

  return (
    <UserInformationContext.Provider value={returnValue}>
      {children}
    </UserInformationContext.Provider>
  )
}

export default UserInformationProvider