import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  className?: string;
  children: React.ReactNode;
};

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
