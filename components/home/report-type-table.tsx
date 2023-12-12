import { ReportType } from "@/app/model/reportType";
import { ReportTypeCreateDialog } from "./report-type-create-dialog";
import { ReportTypeEditDialog } from "./report-type-edit-dialog";

type TicketTypeTableProps = {
	data: ReportType[];
};

const ReportTypeTable = ({ data }: TicketTypeTableProps) => {
  return (
    <div className="mt-6">
        <table className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up z-10"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
          >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b"><ReportTypeCreateDialog></ReportTypeCreateDialog></th>
            </tr>
          </thead>
          <tbody>
            {data.map((type) => (
              <tr
                key={type.id}
                className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
              >
                <td className="py-2 px-4 border-b">{type.id}</td>
                <td className="py-2 px-4 border-b">{type.name}</td>
                <td className="py-2 px-4 border-b">
                  <ReportTypeEditDialog id={type.id} name={type.name}></ReportTypeEditDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default ReportTypeTable;