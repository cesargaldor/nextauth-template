import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";

export async function getLoggedUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
