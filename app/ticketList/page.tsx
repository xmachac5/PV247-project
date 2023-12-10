import TicketTable from "@/components/home/ticket-table";

const WhistleblowerPage = () => {
  const data = [
    {
      id: 1,
      title: "test1",
      created_at: "28.09.2023",
      state: "new",
      due_date: "27.10.2023",
    },
    {
      id: 2,
      title: "test2",
      created_at: "28.09.2023",
      state: "new",
      due_date: "27.10.2023",
    },
  ];

  return <TicketTable data={data}></TicketTable>;
};

export default WhistleblowerPage;
