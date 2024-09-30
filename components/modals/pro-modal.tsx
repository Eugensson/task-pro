"use client";

import { toast } from "sonner";
import Image from "next/image";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex justify-center items-center">
          <Image
            src="/hero.svg"
            alt="Hero icon"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="text-xl font-semibold">Upgrade TaskPro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of TaskPro
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            onClick={onClick}
            disabled={isLoading}
            variant="primary"
            className="w-full"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
