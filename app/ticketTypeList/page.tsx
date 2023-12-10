import TicketTypeTable from "@/components/home/ticket-type-table";

const TicketTypePage = () => {
    const data = [
      {
        id: 1,
        name: "type1"
      },
      {
        id: 2,
        name: "type2"
      },
    ];
  
    return <TicketTypeTable data={data}></TicketTypeTable>;
  };
  
  export default TicketTypePage;