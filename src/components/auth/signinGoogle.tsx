"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SignInGoogle() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data :any) => {
    console.log("User details:", data);
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          <p className="text-gray-600 mt-1">AI-Powered Lesson Planning Assistant</p>
        </div>

        <CardContent className="p-0">
          <h2 className="text-2xl font-bold mb-6">Complete your profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Organization</label>
              <Input id="organization" {...register("organization")} placeholder="Enter organization" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Your profession</label>
              <Select>
                <SelectTrigger className="w-full">
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

            <Button type="submit" className="w-full bg-blue hover:bg-blue-600 text-white py-2 shadow-lg">
              Finish signing up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
