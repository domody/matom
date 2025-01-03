import fs from "fs";
import path from "path";

export default async function ChapterPage({ params }) {
  const paramaters = await params
  const chapterDir = path.join(
    process.cwd(),
    `public/chapters/${paramaters.chapter}`,
  );
  const files = fs.readdirSync(chapterDir);
  const images = files.map((file) => `/chapters/${paramaters.chapter}/${file}`);

  return (
    <div className="flex flex-col items-center h-full p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {paramaters.chapter.replace(/-/g, " ")}
      </h1>
      <div className="flex h-full w-full items-start justify-center overflow-y-scroll">
        <div className="h-full w-1/2">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Page ${index}`} className="mb-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
