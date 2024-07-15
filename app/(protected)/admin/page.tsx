"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { date } from "zod";

const AdminPage = () => {
  const onServerActionCheck = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
        window.location.href = "/createcontest";
      }
    });
  };
  const createProblem = async () => {
    try {
      const response = await fetch("/api/admin");
      if (response.ok) {
        toast.success("Allowed API Route!");
        window.location.href = "/createproblem";
      } else {
        toast.error("Forbidden API Route!");
      }
    } catch (error) {
      console.error("Fetch error!", error);
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent content="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Create a new problem</p>
          <Button onClick={createProblem}>Create</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Create a new Contest</p>
          <Button onClick={onServerActionCheck}>Create</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
