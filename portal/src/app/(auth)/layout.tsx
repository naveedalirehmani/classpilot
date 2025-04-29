"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50 min-h-screen">
      
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        {children}
      </div>
    </main>
  );
}