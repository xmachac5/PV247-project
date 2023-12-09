"use client";

import Link from 'next/link';

type Ticket = {
    id: number;
    title: string;
    created_at: string;
    state: string;
    due_date: string;
}

type TicketTableProps = {
	data: Ticket[];
};

const TicketTable = ({ data }: TicketTableProps) => {
  return (
    <div className="mt-6">
        <table className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
          >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Detail</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => (
              <tr
                key={todo.id}
                className="text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
                style={{ animationDelay: "0s", animationFillMode: "forwards" }}
              >
                <td className="py-2 px-4 border-b">{todo.id}</td>
                <td className="py-2 px-4 border-b">{todo.title}</td>
                <td className="py-2 px-4 border-b">{todo.created_at}</td>
                <td className="py-2 px-4 border-b">{todo.state}</td>
                <td className="py-2 px-4 border-b">{todo.due_date}</td>
                <td className="py-2 px-4 border-b">
                  <Link href="/[id]" as={`/${todo.id}`}>
                    <p className="text-blue-500">View Details</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default TicketTable;