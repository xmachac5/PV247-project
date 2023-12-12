import { ReportType } from '@prisma/client';
import React from 'react';

type DeleteButtonProps = {
    reportType: ReportType;
};

const ReportTypeDeleteButton: React.FC<DeleteButtonProps> = ({ reportType }) => {
    const handleDelete = async () => {
        try {
            console.log(reportType.id);
            const response = await fetch('/api/reportType', {
                method: 'DELETE',
                body: JSON.stringify(reportType),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            if (response.ok) {
                window.location.href = '/reportTypeList';
            } else {
                console.error('Error deleting report type:', response.statusText);
                // Handle error scenarios here
            }
        } catch (error) {
            console.error('Error deleting report type:', error);
            // Handle error scenarios here
        }
    };

    return (
        <>
            <button className="btn-primary" onClick={handleDelete}>
                Delete
            </button>
        </>
    );
};

export default ReportTypeDeleteButton;