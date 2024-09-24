import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export const Heading1: React.FC<ComponentPropsWithoutRef<"h1">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={clsx("text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export const Heading2: React.FC<ComponentPropsWithoutRef<"h2">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2 className={clsx("text-3xl font-bold", className)} {...props}>
      {children}
    </h2>
  );
};

export const Heading3: React.FC<ComponentPropsWithoutRef<"h3">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 className={clsx("text-2xl font-bold", className)} {...props}>
      {children}
    </h3>
  );
};

export const Heading4: React.FC<ComponentPropsWithoutRef<"h4">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 className={clsx("text-xl font-medium", className)} {...props}>
      {children}
    </h3>
  );
};

export const LargeBody: React.FC<ComponentPropsWithoutRef<"p">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={clsx("text-lg", className)} {...props}>
      {children}
    </p>
  );
};

export const Body: React.FC<ComponentPropsWithoutRef<"p">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={clsx("text-md", className)} {...props}>
      {children}
    </p>
  );
};
