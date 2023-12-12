"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export const CreateTaskDialog = () => {
  const dailogRef = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState("");
  const [pasw, setPasw] = useState("");

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row">
        <Link href="/new-report" className="btn-primary m-3">
          New report
        </Link>
        <div className="flex justify-center md:m-3 md:p-1.5">OR</div>
        <button
          className="btn-primary m-3"
          onClick={() => {
            dailogRef.current?.show();
          }}
        >
          View existing
        </button>
      </div>

      <dialog
        ref={dailogRef}
        className="h-full w-full items-center justify-center bg-[transparent] backdrop:backdrop-blur-md [&[open]]:flex"
      >
        <form className="flex flex-col gap-3 border border-black bg-indigo-50 p-6">
          <h2 className="text-xl">Crime report:</h2>
          {/* TODO: Use state to control this input */}
          <input
            className="text-box"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="text-box"
            value={pasw}
            onChange={(e) => setPasw(e.target.value)}
          />
          <Link
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
            href={`/report/${id}?pasw=${pasw}`}
            as={`/report/${id}`}
            onClick={(e) => {
            // 
              //e.preventDefault();
              dailogRef.current?.close();
            }}
          >
            View
          </Link>
        </form>
      </dialog>
    </>
  );
};
