import "./page.scss";
import Link from "next/link";
import { videos } from "@/data/videoData";

export default function Home() {
  const randomIndex = Math.floor(Math.random() * 8);
  const video = Object.keys(videos)[randomIndex];
  const generatedLink = `https://letempsdun.cafe/break?time=10&position=bottom-right&video=${video}`;
  return (
    <>
      <video
        autoPlay
        loop
        muted
        src={Object.values(videos)[randomIndex].videoUrl}
      ></video>

      <main className="Home">
        <section>
          <h1>C'est le temps d'un café !</h1>
          <div>
            <Link href="/create">
              <button>Customize a break video</button>
            </Link>
            <Link href={generatedLink} target="_blank">
              <button>Random 10 minutes break video</button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
