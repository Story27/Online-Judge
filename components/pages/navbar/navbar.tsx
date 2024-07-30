"use client";

import { LoginButton } from "@/components/auth/login/login-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UseCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import logo from "@/public/logo.svg"

const Navbar = () => {
  const user = UseCurrentUser();

  return (
    <nav className="flex justify-between items-center px-8 shadow-md h-36">
      <div className="text-white text-2xl font-bold">
        <a href="/" className="text-white pr-8 ">
          <Image src={logo} alt="Logo" className="h-32 w-48" />
        </a>
      </div>

      <div className="flex items-center justify-center pb-12">
        <a href="/problems" className="text-white pr-8 ">
          Problems
        </a>
        <a href="/contests" className="text-white pr-8">
          Contests
        </a>

        {user ? (
          <a href="/client">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-slate-700">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </a>
        ) : (
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
