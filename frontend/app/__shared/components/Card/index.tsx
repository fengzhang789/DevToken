import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import { Heading3 } from "../Headings";

type Props = ComponentPropsWithoutRef<"section"> & {
  width?: number;
  title: string;
};

const Card = ({ width = 400, title, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        `w-[${width}px] inline-block px-4 py-3 rounded-md border-slate-300 border-2`,
        className,
      )}
      {...props}
    >
      <Heading3 className="mb-4">{title}</Heading3>

      {props.children}
    </section>
  );
};

export default Card;
