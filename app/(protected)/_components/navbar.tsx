"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { UserButton } from "@/components/auth/user/user-button";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed top-4 flex justify-between items-center p-3 rounded-xl w-full shadow-sm bg-white z-50">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href="/">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">User</Link>
        </Button>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        </RoleGate>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
