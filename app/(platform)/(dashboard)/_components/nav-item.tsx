"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import path from "path";

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpended: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpended,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpended && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl}
              fill
              alt="Organization logo"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-semibold">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map(({ label, icon, href }) => (
          <Button
            key={href}
            size="sm"
            onClick={() => onClick(href)}
            variant="ghost"
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === path.join(href) && "bg-sky-500/10 text-sky-700"
            )}
          >
            {icon}
            {label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
