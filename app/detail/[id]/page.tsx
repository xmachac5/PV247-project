import { DbReport } from "@/app/model/report";
import { usePathname } from "next/navigation";
import prisma from "@/lib/prisma";
import { ReportEditDialog } from "@/components/home/report-edit-dialog";

type Props = {
  params: { id: string };
};

const TicketDetail = async ({ params }: Props) => {
  const report = await prisma.report.findFirst({
    where: { id: params.id },
    include: { personalData: true, reportType: true },
  });

  if (!report) {
    return <h3 className="mb-4 text-2xl text-red-700">Report not found</h3>;
  }

  const personalData = report.personalData;

  return (
    <div
      className="flex animate-fade-up justify-center space-x-6 text-center text-gray-700 opacity-0 [text-wrap:balance] md:text-xl"
      style={{ animationDelay: "0s", animationFillMode: "forwards" }}
    >
      {report && (
        <div className="inline-block rounded-lg border bg-white p-4 shadow-md">
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
          <ReportEditDialog id={report.id} type={"Type 1"} state={" "}></ReportEditDialog>
        </div>
      )}
      <div className="inline-block rounded-lg border bg-white p-4 shadow-md">
        <h3 className="mb-4 from-black to-stone-500 text-2xl">
          Whistleblower Information
        </h3>
        {personalData == undefined ? (
          <p className="mb-2 text-lg">Anonymous Whistleblower {JSON.stringify(report.personalData)}</p>
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
};

export default TicketDetail;
