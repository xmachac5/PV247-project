import { LawyerNoPassword } from '@/app/model/lawyer';
import React from 'react';

type DeleteButtonProps = {
    lawyer: LawyerNoPassword;
};

const LawyerDeleteButton: React.FC<DeleteButtonProps> = ({ lawyer }) => {
    const handleDelete = async () => {
        try {
            console.log(lawyer.id);
            const response = await fetch('/api/lawyer', {
                method: 'DELETE',
                body: JSON.stringify(lawyer),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            if (response.ok) {
                window.location.href = '/lawyerList';
            } else {
                console.error('Error deleting lawyer:', response.statusText);
                // Handle error scenarios here
            }
        } catch (error) {
            console.error('Error deleting lawyer:', error);
            // Handle error scenarios here
        }
    };

    return (
        <button className="btn-primary" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default LawyerDeleteButton;