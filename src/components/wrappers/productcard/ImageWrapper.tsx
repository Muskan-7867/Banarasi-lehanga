import { cn } from "@/lib/utills/cn";
import Image from "next/image";
import React from "react";

interface ImageWrapperProps {
  src: string;
  alt: string;

  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  children?: React.ReactNode;
  onMouseHover?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  quality?: number;
}

export default function ImageWrapper({
  src,
  alt,

  className = "",
  children,
  onMouseHover,
  onMouseLeave,
  onClick,
  quality = 100
}: ImageWrapperProps) {
  return (
    <div
      onMouseEnter={onMouseHover}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        "relative w-full aspect-[3/4] overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={quality}
        height={quality}
        className="h-full w-full object-cover"
      />
      {children}
    </div>
  );
}
