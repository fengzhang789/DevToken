import React, { ComponentPropsWithoutRef } from "react";

export type TableColumnInput = Array<{
  field: string;
  headerName: string;
  width?: number;
  renderCell?: (params: Record<string, string | number>) => React.ReactNode;
}>;

type Props = Omit<ComponentPropsWithoutRef<"table">, "children"> & {
  columns: TableColumnInput;
  rows: Array<Record<string, string | number>>;
};

const tableBgColor = (rowNumber: number) => {
  if (rowNumber % 2 == 0) {
    return "bg-gray-200";
  }
};

const Table: React.FC<Props> = ({ columns, rows, ...props }: Props) => {
  return (
    <table className="border-2 border-gray-800" {...props}>
      <thead>
        <tr>
          {columns.map((col) => {
            return (
              <th
                className={`border-2 border-gray-500 text-start px-2 py-2 w-[${col.width ?? "auto"}]`}
                key={col.field}
              >
                {col.headerName}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => {
          return (
            <tr className={tableBgColor(rowIndex)} key={rowIndex}>
              {columns.map((col) => {
                if (row[col.field]) {
                  return (
                    <td
                      className={
                        "border-2 border-gray-500 text-start px-2 py-1"
                      }
                      key={col.field}
                    >
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
