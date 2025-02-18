"use client"; 

import Link from "next/link";
import "../Navbar/styles.css"

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/xkcd">XKCD</Link>
      <Link href="/catpics">Duck Photos</Link>
      <Link href="ronswanson">Ron Swanson</Link>
      <Link href="weather">Weather Search</Link>
    </nav>
  );
}
