import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Link href="/app" className="font-mono text-2xl underline">
        Matom
      </Link>
    </div>
  );
}
