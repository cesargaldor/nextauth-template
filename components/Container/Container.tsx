import { cn } from "@/libs/utils";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-8 w-full max-w-[90%] lg:max-w-[60%] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
