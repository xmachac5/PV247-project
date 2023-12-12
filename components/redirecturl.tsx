"use client";

import { useRouter } from "next/navigation";

export const RedirectReplaceUrl = ({url} : {url:string}) => {
  const router = useRouter();
  router.replace(url);
  return <></>;
};
