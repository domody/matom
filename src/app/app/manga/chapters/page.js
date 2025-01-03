import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function ChaptersPage() {
  const chaptersDir = path.join(process.cwd(), "public/chapters");
  const chapters = fs.readdirSync(chaptersDir);



  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-6 text-3xl font-bold">Chapters</h1>
      {chapters.map((chapter, index) => (
        <Link key={index} href={`/app/manga/chapters/${chapter}`}>
          <div className="cursor-pointer px-4 py-1.5 border border-dark-200 rounded-md w-full text-center hover:bg-dark-700">
            {chapter.replace(/-/g, ' ')}
          </div>
        </Link>
      ))}
    </div>
  );
}
