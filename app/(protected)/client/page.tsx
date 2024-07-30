"use client";

import { UserInfo } from "@/components/user-info";
import { UseCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = UseCurrentUser();
  return <UserInfo label="User Info" user={user} />;
};
export default ClientPage;
