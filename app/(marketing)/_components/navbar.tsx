import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <nav className="md:max-w-screen-2xl mx-auto w-full flex justify-between items-center">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex justify-between items-center w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get TaskPro for free</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
