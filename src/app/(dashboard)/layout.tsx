import { Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="text-white p-4 text-center text-xl font-bold shadow-md flex justify-between">
      <div className="flex items-center gap-2">
        <button className="md:hidden">
          {true ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="text-primary font-bold text-xl flex items-center mt-6">
          <Image
            src="/logo.svg"
            alt="Teacher planning illustration"
            width={190}
            height={32}
            className="mb-6 w-auto h-auto"
          />
        </div>
        <nav className="ml-12 hidden md:block">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 text-xl font-normal font-roboto"
          >
            Home
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2 md:gap-6 mr-4">
        <Button className=" hidden md:flex bg-blue-500 hover:bg-blue-600 font-open-sans font-semibold text-xs md:text-md px-2 md:px-4 ">
          <Image
            src="/icons/stairs.svg"
            alt="The Staries"
            width={15}
            height={15}
            className="mr-1"
          />
          <span className=" ">Create new</span>
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-[#C5D5F5] text-white">
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block font-normal font-font-openSan">
            Moeez Ali
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-80 bg-gray-100 p-4 border-r shadow-md">
      <nav className="space-y-2 flex-1">
        <Link
          href="/"
          className="flex items-center gap-4 px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 font-normal"
        >
          <Image
            src="/icons/home.svg"
            alt="Teacher planning illustration"
            width={18}
            height={18}
          />
          Home
        </Link>
        <Link
          href="/recent"
          className="flex items-center gap-4 px-3 py-3 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Image
            src="/icons/clock.svg"
            alt="Teacher planning illustration"
            width={18}
            height={18}
          />
          Recent
        </Link>
        <Link
          href="/resources"
          className="flex items-center gap-4 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Image
            src="/icons/file.svg"
            alt="Teacher planning illustration"
            width={18}
            height={18}
          />
          My resources
        </Link>
      </nav>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="mt-6 w-full">{children}</div>
      </div>
    </div>
  );
}
