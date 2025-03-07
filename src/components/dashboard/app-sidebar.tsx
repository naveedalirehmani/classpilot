"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export default function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2">

        <button 
            className="md:hidden" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
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
            <Link href="/" className="text-gray-700 hover:text-gray-900 text-xl font-normal font-roboto">
              Home
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-6 mr-4">
          <Button className=" hidden md:flex bg-blue-500 hover:bg-blue-600 font-open-sans font-semibold text-xs md:text-md px-2 md:px-4 ">
            <Image src="/icons/stairs.svg" alt="The Staries" width={15} height={15} className="mr-1" />
            <span className=" ">Create new</span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-[#C5D5F5] text-white">
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-normal font-font-openSan">Moeez Ali</span>
          </div>
         
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0  bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed md:static md:w-[264px] w-[240px] bg-white p-4 flex flex-col h-full z-20 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="space-y-2 flex-1">
            <Link href="/" className="flex items-center gap-4 px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 font-normal">
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

          {/* Upgrade card */}
          <Card className="mt-auto p-4 bg-gray-50 border h-auto md:h-[222px]">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-md">Upgrade your subscription</h3>
              </div>
              <Image
                src="/icons/rocket.svg"
                alt="Teacher planning illustration"
                width={28}
                height={28}
              />
            </div>
            <p className="text-sm text-gray-600 ">
              Enhance your experience by upgrading your free account to enjoy premium features
            </p>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade</Button>
          </Card>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-6 mt-4 text-sm rounded-md text-gray-700 hover:bg-gray-100"
          >
            <Image
              src="/icons/setting.svg"
              alt="Teacher planning illustration"
              width={18}
              height={18}
            />
            Setting
          </Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          <div className="max-w-[1400px] mx-auto mt-6 md:mt-12">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-lg md:text-xl font-normal mb-2">Hi, Moeez Ali</h1>
              <p className="text-gray-600 font-open-sans text-sm md:text-base">
                Let&apos;s begin brewing some teaching materials effortlessly with ClassPlanner AI
              </p>
            </div>

            <div className="py-6 md:py-12 rounded-lg shadow-sm overflow-hidden bg-gradient-to-r from-[#f2f9f6] to-[#eaf2fe]">
              <div className="p-4 md:p-8 flex flex-col items-center max-w-[500px] mx-auto">
                <Image
                  src="/icons/man.svg"
                  alt="Teacher planning illustration"
                  width={140}
                  height={140}
                  className="mb-4 md:mb-6 w-[120px] h-[120px] md:w-[170px] md:h-[170px]"
                />
                <h2 className="text-xl md:text-2xl font-bold mb-2">Lesson Plan</h2>
                <p className="text-gray-600 mb-4 md:mb-6 text-center text-sm md:text-base">
                  Create detailed lesson plan with objectives and activities.
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 w-full md:w-96 max-w-md mt-3 font-openSan">
                  Create lesson plan
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}