"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50 h-screen flex justify-center items-center">
      <div>{children}</div>
    </main>
  );
}
