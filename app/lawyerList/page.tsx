'use client';

import LawyerTable from "@/components/home/lawyer-table";
import { Lawyer } from "../model/lawyer";
import { useEffect, useState } from "react";

const LawyerPage = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/lawyer');
                if (!response.ok) {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                    // Handle the error appropriately, e.g., show a user-friendly message.
                } else {
                    const lawyersData = await response.json();
                    console.log('lawyerData:',lawyersData);
                    setLawyers(lawyersData);
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);

  return <LawyerTable data={lawyers}></LawyerTable>;
};

export default LawyerPage;
