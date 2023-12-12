"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { usePathname } from 'next/navigation';
import { LoginStatus } from "@/app/LoginStatus";
import { Providers } from "@/app/Providers";

export default function NavBar({ session }: { session: Session | null }) {
  const scrolled = useScroll(50);
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed top-0 flex w-full justify-center ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Informer</p>
          </Link>
          <div>
            {session ? (
              <div>
                <Link
                  prefetch={false}
                  className={`link ${pathname === "/ticketList" ? "active" : ""} rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black`}
                  href="/ticketList"
                >
                  Tickets
                </Link>
                <Link
                  prefetch={false}
                  className={`link ${pathname === "/ticketTypeList" ? "active" : ""} rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black`}
                  href="/reportTypeList"
                >
                  Ticket types
                </Link>
                <Link
                  prefetch={false}
                  className={`link ${pathname === "/lawyerList" ? "active" : ""} rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black`}
                  href="/lawyerList"
                >
                  Lawyers
                </Link>
              </div>
            ) : (<div></div>
            )}
          </div>
          <Providers><LoginStatus></LoginStatus></Providers>
        </div>
      </div >
    </>
  );
}
