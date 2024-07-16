import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-24 flex w-full flex-col bg-slate-200">
      <div className="mx-72 mb-3 mt-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/art-institute.png"
            alt="Img8"
            width={100}
            height={100}
          />
        </Link>
        <p className="">© 2024 Chigago Institute. All Rights Reserved. </p>
      </div>
    </div>
  );
}
