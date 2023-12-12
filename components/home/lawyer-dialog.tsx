'use client';

import { Lawyer, LawyerDataSchema } from "@/app/model/lawyer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const LawyerDialog = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Lawyer>({
        resolver: zodResolver(LawyerDataSchema)
    });
    const onSubmit: SubmitHandler<Lawyer> = async lawyerData => {
        try {
            const response = await fetch('/api/lawyer', {
                method: 'POST',
                body: JSON.stringify(lawyerData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                dialogRef.current?.close();
                window.location.href = '/lawyerList';
            } else {
                console.error('Error deleting lawyer:', response.statusText);
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

                            <label className="text-lg">
                                Email:
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="name"
                                        className="rounded border p-2"
                                        {...register('email')}
                                    />
                                </div>
                            </label>
                            {errors.email?.message && (
                                <p className="text-red-500">{errors.email?.message}</p>
                            )}

                            <label className="text-lg">
                                Password:
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="name"
                                        className="rounded border p-2"
                                        {...register('password')}
                                    />
                                </div>
                            </label>
                            {errors.password?.message && (
                                <p className="text-red-500">{errors.password?.message}</p>
                            )}

                            <div className="flex gap-3">
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
                className="btn-primary"
                onClick={() => {
                    dialogRef.current?.show();
                }}
            >
                New lawyer
            </button>
        </>
    );
};