type Lawyer = {
    id: number;
    name: string;
    login: string;
}

type LawyerTableProps = {
	data: Lawyer[];
};

const LawyerTable = ({ data }: LawyerTableProps) => {
  return (
    <div className="mt-6">
        <table className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
          >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Login</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lawyer) => (
              <tr
                key={lawyer.id}
                className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
              >
                <td className="py-2 px-4 border-b">{lawyer.id}</td>
                <td className="py-2 px-4 border-b">{lawyer.name}</td>
                <td className="py-2 px-4 border-b">{lawyer.login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default LawyerTable;