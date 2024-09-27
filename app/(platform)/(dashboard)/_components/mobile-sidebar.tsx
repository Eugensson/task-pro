"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Sidebar } from "@/app/(platform)/(dashboard)/_components/sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMouted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMouted) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        className="block md:hidden mr-2"
      >
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="taskpro-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
