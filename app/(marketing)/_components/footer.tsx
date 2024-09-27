import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <nav className="md:max-w-screen-2xl mx-auto w-full flex justify-between items-center">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex justify-between items-center w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </nav>
    </footer>
  );
};
