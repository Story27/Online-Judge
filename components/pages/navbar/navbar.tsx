"use client";

import { LoginButton } from "@/components/auth/login/login-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const user = useCurrentUser();

  return (
    <nav className="flex justify-between items-center px-8 shadow-md bg-black">
      <div className="text-white text-2xl font-bold">
        <a href="/" className="text-white pr-8 ">
          Online Judge
        </a>
      </div>

      <div className="flex items-center justify-center">
        <a href="/problems" className="text-white pr-8 ">
          Problems
        </a>
        <a href="/teams" className="text-white pr-8">
          Teams
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
