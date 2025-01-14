"use client";
import { cn } from "@/lib/utils";
import { FaChevronLeft } from "react-icons/fa";

export default function BackButton({ className }: { className?: string }) {
  return (
    <FaChevronLeft
      className={cn("text-xl my-2 mx-1 cursor-pointer", className)}
      onClick={() => history.back()}
    />
  );
}
