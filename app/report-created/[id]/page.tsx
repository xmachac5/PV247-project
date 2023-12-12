import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <div
      className="flex animate-fade-up flex-col"
      style={{ animationDelay: "0s", animationFillMode: "forwards" }}
    >
      <p>Your report was created with id {params.id}.</p>
      <div className="flex justify-center m-3 drop-shadow-2xl">
        <Link href={"/report/" + params.id} className="btn-primary">
          View report
        </Link>
      </div>
    </div>
  );
};

export default Page;
