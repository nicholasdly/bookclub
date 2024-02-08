import { Button } from "../shadcn-ui/button";
import { DotsIcon } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-ui/dialog";
import { api } from "~/trpc/react";
import { useToast } from "../shadcn-ui/use-toast";

interface PostActionsProps {
  postId: string;
}

export default function PostActions({ postId }: PostActionsProps) {
  const utils = api.useUtils();
  const { toast } = useToast();

  const deletePost = api.posts.delete.useMutation({
    onSuccess() {
      void utils.posts.invalidate();
      toast({
        variant: "default",
        description: "Successfully deleted post!",
      });
    },
    onError(error) {
      const zodMessage = error.data?.zodError?.fieldErrors.content?.[0];
      const message =
        zodMessage ?? "Failed to delete post, please try again later.";

      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="mr-1 h-6 w-6 rounded-full"
          >
            <DotsIcon className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this post?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this post from all feeds and your profile?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => deletePost.mutate({ id: postId })}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
