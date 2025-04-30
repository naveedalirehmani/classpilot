"use client";

// import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* <Navbar /> */}
      <div className="flex justify-center items-center h-screen">
        {children}
      </div>
    </main>
  );
}
