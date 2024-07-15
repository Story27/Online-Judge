"use client";

import { LoginButton } from "@/components/auth/login/login-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
  const user = useCurrentUser();

  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-md">
      <div className="text-white text-2xl font-bold">Online Judge</div>

      <div className="flex">
        <a href="/settings" className="text-white px-8">
          Settings
        </a>
        <a href="/teams" className="text-white px-8">
          Teams
        </a>

        {user ? (
          <a href="/client" className="text-white px-8">
            Profile
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
