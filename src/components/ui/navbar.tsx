import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="mt-1 flex w-full items-center justify-between px-10 font-noto text-sm">
      <ul className="flex items-center gap-3">
        <Link href="/">
          <Image
            src="/images/art-institute.png"
            width={70}
            height={10}
            alt="Art-institute-logo"
          />
        </Link>
      </ul>
      <ul className="flex items-center gap-10">
        <li>Exhibits</li>
        <li>Events</li>
        <li>Visit</li>
        <li>Membership</li>
      </ul>
    </nav>
  );
}
