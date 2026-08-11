"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  isPending?: boolean;
  isSubmitDisabled?: boolean;
  submitText: string;
  loadingText?: string;
  cancelText?: string;
}

const CustomDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  isPending = false,
  isSubmitDisabled = false,
  submitText,
  loadingText = "Submitting...",
  cancelText = "Cancel",
}: CustomDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onOpenChange(false);
      }}
    >
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-hidden rounded-3xl border bg-card p-0 gap-0"
        showCloseButton={false}
      >
        <form onSubmit={onSubmit} className="flex max-h-[90vh] flex-col">
          <DialogHeader className="shrink-0 space-y-2 border-b px-6 py-5 text-left">
            <DialogTitle className="text-xl font-bold tracking-tight">
              {title}
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-8">{children}</div>
          </div>

          <DialogFooter className="shrink-0 m-0 gap-3 rounded-none border-t bg-transparent px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 cursor-pointer rounded-xl"
            >
              {cancelText}
            </Button>

            <Button
              type="submit"
              disabled={isPending || isSubmitDisabled}
              className="h-11 cursor-pointer rounded-xl"
            >
              <>
                {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? loadingText : submitText}
              </>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
