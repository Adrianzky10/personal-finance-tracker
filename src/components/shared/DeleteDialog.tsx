import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;

  description: React.ReactNode;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  onDelete: () => void;
};

const DeleteDialog = (props: DeleteDialogProps) => {
  const {
    open,
    onOpenChange,
    title = "Delete Confirmation",
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    loading,
    onDelete,
  } = props;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            {loading ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                {confirmText}ing...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
