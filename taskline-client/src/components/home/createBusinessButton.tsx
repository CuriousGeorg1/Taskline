"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateBusinessForm } from "./createBusinessForm";

/**
 * Used to "separate" server side components from client side to avoid
 * bugs with authentication headers
 * @returns {JSX.Element} a button to activate a modal/Dialog popup
 * for createBusinessForm
 */
export const CreateBusinessButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary p-0 h-auto">
          create your own
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Create Business</DialogTitle>
        <CreateBusinessForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
