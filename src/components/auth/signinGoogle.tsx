import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function SignInGoogle() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <Image
              src="/logo.svg"
              className="w-fit"
              alt="Logo"
              width={24}
              height={24}
            />
          </div>
          <p className="text-gray-600 mt-1">
            AI-Powered Lesson Planning Assistant
          </p>
        </div>

        <CardContent className="p-0">
          <h2 className="text-2xl font-bold mb-6">Create account</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Organization
              </label>
              <Input
                id="organization"
                placeholder="Enter organization"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-700"
              >
                Your profession
              </label>
              <Select>
                <SelectTrigger id="profession" className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="referral"
                className="block text-sm font-medium text-gray-700"
              >
                How did you hear about Us?
              </label>
              <Select>
                <SelectTrigger id="referral" className="w-full">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="friend">Friend/Colleague</SelectItem>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="ad">Advertisement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-blue hover:bg-blue-600 text-white py-2 shadow-lg">
              Finish signing up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
