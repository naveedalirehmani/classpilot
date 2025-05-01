import Link from "next/link";
import Signup from "../components/signup-form";
import Image from "next/image";

function signupForm() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/readBook.jpg"
          alt="Image"
          width={1000}
          height={1000}
          className="absolute h-full object-cover bg-muted"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/mainLogo.png" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}
export default signupForm;
