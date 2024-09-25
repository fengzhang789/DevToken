import BoxReveal from "@/components/magicui/box-reveal";
import RetroGrid from "@/components/magicui/retro-grid";
import Link from "next/link";
import { Heading1, Heading4 } from "./__shared/components/Headings";
import icon from "@/app/icon.png";
import Image from "next/image";
import PulsatingButton from "@/components/magicui/pulsating-button";

export default function Home() {
  return (
    <main className="h-screen overflow-scroll flex flex-col items-center">
      <RetroGrid className="top-0" />

      <section className="w-[700px] mt-40 flex flex-row justify-between">
        <div className="max-w-[500px]">
          <BoxReveal>
            <Heading1>DevToken</Heading1>
          </BoxReveal>

          <BoxReveal>
            <Heading4 className="font-normal mt-4">
              The platform to earn tokens based on your contributions to GitHub.
              Trade your tokens for fun NFTs and medals to be added to your
              profile. Share with friends. A fun personal project built by{" "}
              <Link
                className="underline text-blue-500"
                href={"https://github.com/fengzhang789"}
                target="_blank"
              >
                Feng Zhang
              </Link>
              .
            </Heading4>
          </BoxReveal>
        </div>

        <div>
          <Image
            className="h-[200px] w-[200px]"
            alt="DevToken golden coin with a D on it"
            src={icon}
          />
        </div>
      </section>

      <div className="flex flex-row justify-start w-[700px] mt-8">
        <Link className="align-start" href="login">
          <PulsatingButton className="bg-black" pulseColor="#111111">
            Get Started
          </PulsatingButton>
        </Link>
      </div>
    </main>
  );
}
