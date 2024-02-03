import { Tooltip, TooltipContent, TooltipTrigger } from "~/app/_components/shadcn-ui/tooltip";
import { AuthorIcon, DeveloperIcon } from "./icons";

interface BadgeProps {
  size: "sm" | "lg";
  type: "user" | "developer" | "author";
}

export default function Badge({ size, type }: BadgeProps) {
  let icon, title;
  
  const dimensions = size === "sm" ? "w-4 h-4" : "w-6 h-6"

  if (type === "developer") {
    icon = <DeveloperIcon className={`${dimensions} text-indigo-500`} />;
    title = "Developer";
  } else if (type === "author") {
    icon = <AuthorIcon className={`${dimensions} text-amber-400`} />;
    title = "Verified Author";
  } else {
    return;
  }

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipContent>{title}</TooltipContent></Tooltip>
  );
}