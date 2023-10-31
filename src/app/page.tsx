import "./page.scss";
import Link from "next/link";

export default function Home() {
  return (
    <header>
      <h1>C'est le temps d'un café !</h1>
      <p>
        Click <Link href="/create">here</Link> to customize a break video, or{" "}
        <Link href="/create">here</Link> if you want to create a random one that lasts 10
        minutes!
      </p>
    </header>
  );
}
