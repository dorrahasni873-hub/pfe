import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import { useAuthentification } from "@/features/auth/hooks/useAuth";

type Props = {
  label: string;
  children: React.ReactNode;
  adminOnly?: boolean;
};

export function DialogueCreer({ label, children, adminOnly = false }: Props) {
  const { user } = useAuthentification();

  if (adminOnly && user?.role !== "admin") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <IconPlus className="size-4" />
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
