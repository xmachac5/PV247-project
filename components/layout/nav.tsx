import { getServerAuthSession } from "@/app/auth-options";
import Navbar from "./navbar";

export default async function Nav() {
  const status = await getServerAuthSession();
  return <Navbar session={status} />;
}
