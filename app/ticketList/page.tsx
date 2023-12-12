import TicketTable from "@/components/home/ticket-table";
import prisma from "@/lib/prisma"
import { PersonalData } from "../model/report";

const WhistleblowerPage = async () => {
  const reports = await prisma.report.findMany({
    include: {
      personalData: true,
      reportType: true,
    }
  });

  const mapPersonalData = (peronalData: any): PersonalData | undefined => {
    if (peronalData == undefined) {
      return undefined;
    } else{
      return {...peronalData, id: undefined};
    }
  };

  const transformed = reports.map(report => ({ ...report, personalData: mapPersonalData(report.personalData)}));

  return <TicketTable data={transformed}></TicketTable>;
};

export default WhistleblowerPage;
