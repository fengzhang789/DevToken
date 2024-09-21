import Link from "next/link";

export default function Home() {
  return (
    <div className="h-60 flex justify-center items-center">
      <Link href={"login"}>
        Login
      </Link>
    </div>
  );
}
