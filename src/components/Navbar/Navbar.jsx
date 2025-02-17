"use client"; 

import Link from "next/link";
import "../Navbar/styles.css"

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/xkcd">XKCD</Link>
      <Link href="/catpics">Cat Photos</Link>
    </nav>
  );
}
