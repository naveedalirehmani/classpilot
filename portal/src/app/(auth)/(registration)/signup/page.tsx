import Link from "next/link";
import Signup from "../../components/signup-form";
import Image from "next/image";

function signupForm() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="relative hidden bg-white lg:block">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
          <Image
            src="/signup.png"
            alt="Image"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/classpilot.png"
              alt="Logo"
              width={100}
              height={100}
            />
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
