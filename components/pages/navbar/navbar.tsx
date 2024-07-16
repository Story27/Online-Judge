"use client";

import { LoginButton } from "@/components/auth/login/login-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const user = useCurrentUser();

  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-md">
      <div className="text-white text-2xl font-bold">Online Judge</div>

      <div className="flex items-center justify-center">
        <a href="/settings" className="text-white pr-8 ">
          Settings
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
