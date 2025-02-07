import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/app" className="font-mono text-2xl underline">
        Matom
      </Link>
    </div>
  );
}
