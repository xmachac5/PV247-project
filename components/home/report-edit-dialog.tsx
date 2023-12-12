'use client';

import { ReportEdit, reportEditSchema } from "@/app/model/report";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportType } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ReportDialogProps = {
    id: string;
    type: string;
    state: string;
};

export const ReportEditDialog = ({
    id,
    type,
    state,
}: ReportDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        setValue, // Added for setting values
        formState: { errors }
    } = useForm<ReportEdit>({
        resolver: zodResolver(reportEditSchema)
    });

    useEffect(() => {
        const fetchReportTypes = async () => {
            try {
                const response = await fetch('/api/reportType');
                if (response.ok) {
                    const data = await response.json();
                    setReportTypes(data); // Assuming the response is an array of report types
                } else {
                    console.error('Error fetching report types:', response.statusText);
                    // Handle error scenarios here
                }
            } catch (error) {
                // Handle any error that occurs during fetch
            }
        };

        fetchReportTypes();
    }, []); // Empty dependency array ensures that this effect runs only once on component mount

    const onSubmit: SubmitHandler<ReportEdit> = async reportData => {
        try {
            console.log(reportData);
            const response = await fetch('/api/report', {
                method: 'PUT',
                body: JSON.stringify({ ...reportData, id: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                dialogRef.current?.close();
                window.location.href = '/reportList';
            } else {
                console.error('Error editing report:', response.statusText);
                // Handle error scenarios here
            }
        } catch (error) {
            // Handle any error that occurs during mutation
        }
    };
    return (
        <>
            <dialog ref={dialogRef} className="rounded-md bg-white p-10 z-50">
                {(
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Input fields with labels and error messages */}
                        <div className="flex flex-col gap-3">
                            <label className="text-lg">
                                Type:
                                <div className="flex">
                                    <select
                                        id="type"
                                        className="rounded border p-2"
                                        {...register('type')}
                                    >
                                        {reportTypes.map((reportType, index) => (
                                            <option key={reportType.id} value={reportType.name}>
                                                {reportType.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                            {errors.type?.message && (
                                <p className="text-red-500">{errors.type?.message}</p>
                            )}
                            <label className="text-lg">
                                State:
                                <div className="flex">
                                    <select
                                        id="state"
                                        className="rounded border p-2"
                                        {...register('state')}
                                    >
                                        <option value="New">New</option>
                                        <option value="In progress">In progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Denied">Denied</option>
                                    </select>
                                </div>
                            </label>
                            <div className="flex flex-col justify-center md:flex-row">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                >
                                    Send
                                </button>
                                <button
                                    className="btn-primary"
                                    type="reset"
                                    onClick={() => dialogRef.current?.close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </dialog>
            <button
                className="btn-primary m-3"
                onClick={() => {
                    dialogRef.current?.show();
                }}
            >
                Edit
            </button>
        </>
    );
};