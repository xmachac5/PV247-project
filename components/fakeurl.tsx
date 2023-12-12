"use client";

import { useEffect } from "react";

export const FakeUrl = ({ url }: { url: string }) => {
  useEffect(() => {
    window.history.replaceState({}, "", url);
  });

  return <></>;
};
