"use client";

import ReportTypeTable from "@/components/home/report-type-table";
import { useEffect, useState } from "react";
import { ReportType } from "../model/reportType";

const ReportTypePage = () => {
  const [reportTypes, setLawyers] = useState<ReportType[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('/api/reportType');
              if (!response.ok) {
                  console.error(`Error: ${response.status} - ${response.statusText}`);
                  // Handle the error appropriately, e.g., show a user-friendly message.
              } else {
                  const reportTypesData = await response.json();
                  console.log('reportTypeData:',reportTypesData);
                  setLawyers(reportTypesData);
              }
          } catch (error) {
              console.error('Error fetching movie data:', error);
              // Handle error
          }
      };

      fetchData();
  }, []);

return <ReportTypeTable data={reportTypes}></ReportTypeTable>;
};
  
  export default ReportTypePage;