import { CreateTaskDialog } from "@/components/home/create-tastk-dialog";
import { getServerAuthSession } from "./auth-options";

export default async function Home() {
  const status = await getServerAuthSession();
  if (!status) {
    return (
      <>
        <div className="z-10 w-full max-w-xl px-5 xl:px-0">
          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Making your workplace safer
          </h1>
          <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
            <CreateTaskDialog />
          </div>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Informing about crime at workplace helps to keep you and your
            coleagues safe.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
        <div className="z-10 w-full max-w-xl px-5 xl:px-0">
          <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Lawyer portal
          </h1>
          <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          </div>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Defending Truth, Protecting Voices: Your Gateway to Whistleblower Justice.
          </p>
        </div>
      </>
  );
};
