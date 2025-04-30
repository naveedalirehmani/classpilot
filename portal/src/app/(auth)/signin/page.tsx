import LoginForm from "../components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid h-screen lg:grid-cols-2 w-full">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.png"
          alt="Image"
          className="absolute inset-0 w-2/3 m-auto bg-muted"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white">T</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block ">
              Class Planner
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
