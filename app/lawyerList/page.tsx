import LawyerTable from "@/components/home/lawyer-table";

const LawyerPage = () => {
  const data = [
    {
      id: 1,
      name: "lawyer1",
      login: "lawyer1"
    },
    {
      id: 2,
      name: "lawyer2",
      login: "lawyer2"
    },
  ];

  return <LawyerTable data={data}></LawyerTable>;
};

export default LawyerPage;
