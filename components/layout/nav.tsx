import { getServerAuthSession } from "@/app/auth-options";
import Navbar from "./navbar";

export default async function Nav() {
  const status = await getServerAuthSession();
  console.log(status);
  return <Navbar session={status} />;
}
