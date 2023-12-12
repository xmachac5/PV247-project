'use client';

import { usePathname } from 'next/navigation';

const TicketDetail = () => {
  const id = usePathname().substring(1);
  const ticket = {
    id: 1,
    title: "test1",
    created_at: "28.09.2023",
    state: "new",
    due_date: "27.10.2023"
  };
  const whistleblower = {
    name: "name",
    birthdate: "birthdate",
    address: "address",
    email: "email",
    phone: "phone",
    anonymous: false
  }

return (
    <div className="flex justify-center space-x-6 text-center text-gray-700 opacity-0 [text-wrap:balance] md:text-xl animate-fade-up"
    style={{ animationDelay: "0s", animationFillMode: "forwards" }}
    >     
      {ticket && (
        <div className="inline-block rounded-lg border bg-white shadow-md p-4">
          <h3 className="mb-4 text-2xl from-black to-stone-500">{ticket.title}</h3>
          <p className="mb-2 text-lg">{`ID: ${ticket.id}`}</p>
          <p className="mb-4 text-lg">{`Completed: ${ticket.state ? 'Yes' : 'No'}`}</p>
          <p className="mb-2 text-lg">{`Description: ${ticket.state}`}</p>
          <button
            className="btn-primary m-3"
            type="button"
            // onClick={() => router.push(`/${todo.id + 1}`)}
          >
            Edit
          </button>
        </div>
      )}
      {!ticket && (
        <h3 className="mb-4 text-2xl from-black to-stone-500">Ticket not found</h3>
      )}

      {whistleblower && (
        <div className="inline-block rounded-lg border bg-white shadow-md p-4">
          <h3 className="mb-4 text-2xl from-black to-stone-500">Whistleblower Information</h3>
          {whistleblower.anonymous ? (
            <p className="mb-2 text-lg">Anonymous Whistleblower</p>
          ) : (
            <>
              <p className="mb-2 text-lg">{`Name: ${whistleblower.name}`}</p>
              <p className="mb-2 text-lg">{`Birthdate: ${whistleblower.birthdate}`}</p>
              <p className="mb-2 text-lg">{`Address: ${whistleblower.address}`}</p>
              <p className="mb-2 text-lg">{`Email: ${whistleblower.email}`}</p>
              <p className="mb-2 text-lg">{`Phone: ${whistleblower.phone}`}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketDetail;