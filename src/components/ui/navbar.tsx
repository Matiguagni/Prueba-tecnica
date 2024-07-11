import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="top-0 flex w-full items-center justify-between px-8 py-5 text-sm">
      <ul className="flex items-center gap-3">
        <Link href="/">
          <Image
            src="/images/art-institute.png"
            width={100}
            height={200}
            alt="Art-institute-logo"
          />
        </Link>
      </ul>

      <ul className="flex items-center gap-3">
        <li>
          <Link href="/"> Colection of art</Link>
        </li>
      </ul>
    </nav>
  );
}
