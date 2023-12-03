'use client';
import { useRef, useState } from 'react';

export const CreateTaskDialog = () => {
	const dailogRef = useRef<HTMLDialogElement>(null);
	const [value, setValue] = useState('Plný počet bodov');

	return (
		<>
			<div className="flex justify-center flex-col md:flex-row">
				<button
					className="btn-primary m-3"
					onClick={() => {
						dailogRef.current?.show();
					}}
				>
					New report
				</button>
				<div className='flex justify-center md:p-1.5 md:m-3'>
				OR
				</div>
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
					<textarea
						className="border-0 border-b-2 bg-transparent p-3"
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<button
						className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
						onClick={e => {
							e.preventDefault();
							console.log(value);
							setValue('Plný počet bodov');
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
