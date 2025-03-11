
import { Navbar } from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";


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
