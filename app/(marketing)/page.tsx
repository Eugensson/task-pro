import Link from "next/link";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="w-6 h-6 mr-2" />
          No 1 task management
        </p>
        <h1 className="mb-6 text-3xl md:text-6xl font-bold text-center text-neutral-800">
          TaskPro helps team move
        </h1>
        <p className="text-3xl md:text-6xl font-bold text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md pb-4 w-fit">
          work forward.
        </p>
      </div>
      <p className="mt-4 max-w-xs md:max-w-2xl mx-auto text-center text-sm md:text-xl text-neutral-400 font-secondary">
        Collaborate, manage projects and reach new productivity peaks. From high
        rises to the home office, the way your team works is unique - accomplish
        it all with TaskPro.
      </p>
      <Button asChild className="mt-6" size="lg">
        <Link href="/sign-up">Get TaskPro for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
