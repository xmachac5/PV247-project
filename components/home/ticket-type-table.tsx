import { TicketTypeDialog } from "./ticket-type-dialog";

type TicketType = {
    id: number;
    name: string;
}

type TicketTypeTableProps = {
	data: TicketType[];
};

const TicketTypeTable = ({ data }: TicketTypeTableProps) => {
  return (
    <div className="mt-6">
        <table className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up z-10"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
          >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b"><TicketTypeDialog create={true} defaultValue={"new type"}></TicketTypeDialog></th>
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
                  <TicketTypeDialog create={false} defaultValue={type.name}></TicketTypeDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default TicketTypeTable;