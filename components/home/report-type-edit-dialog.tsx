'use client';

import { ReportType, ReportTypeDataSchema } from "@/app/model/reportType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ReportTypeDialogProps = {
    id: string;
    name: string;
};

export const ReportTypeEditDialog = ({
    id,
    name,
}: ReportTypeDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ReportType>({
        resolver: zodResolver(ReportTypeDataSchema)
    });
    const onSubmit: SubmitHandler<ReportType> = async reportTypeData => {
        try {
            const response = await fetch('/api/reportType', {
                method: 'PUT',
                body: JSON.stringify({ ...reportTypeData, id: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                dialogRef.current?.close();
                window.location.href = '/reportTypeList';
            } else {
                console.error('Error deleting report type:', response.statusText);
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
                                Name:
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="name"
                                        className="rounded border p-2"
                                        {...register('name')}
                                    />
                                </div>
                            </label>
                            {errors.name?.message && (
                                <p className="text-red-500">{errors.name?.message}</p>
                            )}
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
