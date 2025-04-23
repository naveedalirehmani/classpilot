import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-16 border-b border-gray-200 bg-white">
      <div className="container mx-auto h-full px-4 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white">T</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block ">
              Class Planner
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
