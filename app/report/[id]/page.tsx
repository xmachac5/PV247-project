import { FakeUrl } from "@/components/fakeurl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { RedirectReplaceUrl } from "@/components/redirecturl";

type Props = {
  params: { id: string };
  searchParams: { pasw: string };
};

const Page = async ({ params, searchParams }: Props) => {
  const report = await prisma.report.findFirst({
    where: {
      id: params.id,
    },
    include: {
      personalData: true,
    },
  });

  if (searchParams.pasw == null) {
    return <RedirectReplaceUrl url={"/?reportid="+params.id} />
  }

  let content: any = "failed to load";
  if (report == null) {
    content = (
      <p className="font-bold text-red-600">No such report with given id.</p>
    );
  } else if (report.password !== searchParams.pasw) {
    content = <p className="font-bold text-red-600">Invalid password.</p>;
  } else {
    //TODO: actually render it!
    content = <div>{JSON.stringify(report)}</div>;
  }
  
  return (
    <div
      className="flex animate-fade-up flex-col"
      style={{ animationDelay: "0s", animationFillMode: "forwards" }}
    >
      <FakeUrl url={"/report/" + params.id} />
      {content}
    </div>
  );
};

export default Page;
