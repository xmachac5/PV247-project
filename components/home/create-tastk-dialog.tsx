"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export const CreateTaskDialog = ({ reportid }: { reportid?: string }) => {
  const dailogRef = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState(reportid ?? "");
  const [pasw, setPasw] = useState("");

  return (
    <div>
      <dialog
        ref={dailogRef}
        className="z-50 w-full items-center justify-center bg-[transparent] backdrop:backdrop-blur-md [&[open]]:flex"
        open={reportid != null}
      >
        <form className="flex flex-col gap-3 border border-black bg-indigo-50 p-6">
          <h2 className="text-xl font-bold">View my report</h2>
          <label className="block">
          Report id:
          <input
            className="text-box"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          </label>
          <label className="block">
            Password
          <input
          type="password"
            className="text-box"
            value={pasw}
            onChange={(e) => setPasw(e.target.value)}
          /></label>

          <div className="flex justify-between">
            <button
              type="button"
              className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
              onClick={(e) => {
                dailogRef.current?.close();
              }}
            >
              Cancel
            </button>
            <Link
              className="btn-primary"
              href={`/report/${id}?pasw=${pasw}`}
              onClick={(e) => {
                dailogRef.current?.close();
              }}
            >
              Open
            </Link>
          </div>
        </form>
      </dialog>
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
    </div>
  );
};
