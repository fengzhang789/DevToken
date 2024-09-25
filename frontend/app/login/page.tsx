"use client";

import React from "react";
import ConnectWallet from "../__shared/components/ConnectWallet";
import Card from "../__shared/components/Card";
import GithubLogo from "../__shared/assets/github-logo.png"
import Image from "next/image";
import { Body } from "../__shared/components/Headings";

const Page = () => {
  const redirectURL = new URL("https://github.com/login/oauth/authorize");
  redirectURL.searchParams.append(
    "client_id",
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
  );
  redirectURL.searchParams.append(
    "redirect_uri",
    process.env.NEXT_PUBLIC_REDIRECT_URI ?? "",
  );

  if (
    !process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ||
    !process.env.NEXT_PUBLIC_REDIRECT_URI
  ) {
    return "error";
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Card title="Login with GitHub and MetaMask">
        <div className="flex flex-row gap-4">
          <ConnectWallet />
          <button
            className="bg-white border-black border-2 px-4 py-1 rounded-full hover:bg-slate-100"
            onClick={() => window.open(redirectURL.toString())}
          >
            <div className="flex flex-row gap-2 items-center">
              <Body className="font-medium">Login with GitHub</Body>
              <Image src={GithubLogo} className="max-h-[20px] max-w-[20px]" alt="Github logo" />
            </div>
          </button>
        </div>
        
      </Card>
    </main>
  );
};

export default Page;
