import React from "react";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
type Props = {};

function Page({}: Props) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="max-w-[1400px] mx-auto mt-6 md:mt-12">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-lg md:text-xl font-normal mb-2">Hi, Moeez Ali</h1>
          <p className="text-gray-600 font-open-sans text-sm md:text-base">
            Let&apos;s begin brewing some teaching materials effortlessly with
            ClassPlanner AI
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
    </div>
  );
}

export default Page;
