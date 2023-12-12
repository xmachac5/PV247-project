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
    return <RedirectReplaceUrl url={"/?reportid=" + params.id} />;
  }

  let content: any = "failed to load";
  if (report == null) {
    content = (
      <p className="font-bold text-red-600">No such report with given id.</p>
    );
  } else if (report.password !== searchParams.pasw) {
    content = <p className="font-bold text-red-600">Invalid password.</p>;
  } else {
    const personalData = report.personalData;
    content = (
      <div className="flex flex-col sm:flex-row">
        {report && (
          <div className="inline-block m-3 rounded-lg border bg-white p-4 shadow-md">
            <h3 className="mb-4 from-black to-stone-500 text-2xl">
              {report.title}
            </h3>
            <table>
              <tr>
                <th>Id:</th>
                <td>{report.id}</td>
              </tr>
              <tr>
                <th>Title:</th>
                <td>{report.title}</td>
              </tr>
              <tr>
                <th>Created at:</th>
                <td>{report.createdAt.toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Incident occured at:</th>
                <td>{report.datetime.toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Reason:</th>
                <td>{report.reason}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{report.description}</td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{report.state}</td>
              </tr>
              <tr>
                <th>Report type:</th>
                <td>{report.reportType?.name ?? ""}</td>
              </tr>
            </table>
          </div>
        )}
        <div className="m-3 inline-block rounded-lg border bg-white p-4 shadow-md">
          <h3 className="mb-4 from-black to-stone-500 text-2xl">
            Whistleblower Information
          </h3>
          {personalData == undefined ? (
            <p className="mb-2 text-lg">
              Anonymous Whistleblower {JSON.stringify(report.personalData)}
            </p>
          ) : (
            <>
              <p className="mb-2 text-lg">{`Name: ${personalData.name}`}</p>
              <p className="mb-2 text-lg">{`Birthdate: ${personalData.dateBorn}`}</p>
              <p className="mb-2 text-lg">{`Address: ${personalData.address}`}</p>
              <p className="mb-2 text-lg">{`Email: ${personalData.email}`}</p>
              <p className="mb-2 text-lg">{`Phone: ${personalData.phone}`}</p>
            </>
          )}
        </div>
      </div>
    );
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
