import Link from "next/link";

const WhistleblowerPage = () => {
	const data = [{"id": 1, "title": "test1"},{ "id": 2, "title": "test2"}]

	return (
		<div className="flex h-screen items-center justify-center">
			{data.map(todo => (
				<div
					key={todo.id}
					className="flex items-center justify-between px-4 py-2 odd:bg-slate-100"
				>
					{/* TODO: To be links */}
					<div>{todo.title}</div>
					<Link href="/[id]" as={`/${todo.id}`}>
						<p>View Details</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default WhistleblowerPage;