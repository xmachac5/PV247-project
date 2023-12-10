"use client";
import { useRef, useState } from "react";

type TicketTypeDialogProps = {
  create: boolean;
  defaultValue: string;
};

export const TicketTypeDialog = ({
  create,
  defaultValue,
}: TicketTypeDialogProps) => {
  const dailogRef = useRef<HTMLDialogElement>(null);
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        {create ? (
          <button
            className="btn-primary m-3"
            onClick={() => {
              dailogRef.current?.show();
            }}
          >
            New type
          </button>
        ) : (
          <button
            className="btn-primary m-3"
            onClick={() => {
              dailogRef.current?.show();
            }}
          >
            Edit
          </button>
        )}
      </div>
      <dialog
        ref={dailogRef}
        className="h-full w-full items-center justify-center fixed top-0 left-0 z-50"
      >
        <form className="flex flex-col gap-3 border border-black bg-indigo-50 p-6">
          <h2 className="text-xl">Type name:</h2>
          {/* TODO: Use state to control this input */}
          <input
            className="border-0 border-b-2 bg-transparent p-3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={(e) => {
              e.preventDefault();
              console.log(value);
              setValue("Nový typ");
              dailogRef.current?.close();
            }}
          >
            Send
          </button>
        </form>
      </dialog>
    </>
  );
};
