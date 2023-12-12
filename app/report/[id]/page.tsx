import prisma from "@/lib/prisma";

type Props = {
    params: { id: string},
    searchParams: { pasw: string},
}

const Page = async ({params, searchParams}: Props) => {
  const report = await prisma.report.findFirst({
    where: {
      id: params.id,
    },
    include: {
      personalData: true,
    },
  });

  console.log("report server side",params, searchParams);
  
  return (
    <div
      className="flex animate-fade-up flex-col"
      style={{ animationDelay: "0s", animationFillMode: "forwards" }}
    >
      <div>
      Hello:
        </div>
      <div>
      {searchParams.pasw}
      </div>
      {JSON.stringify(report)}
    
    </div>
  );
};

export default Page;
