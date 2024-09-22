import React, { ComponentPropsWithoutRef } from 'react'

type Props = Omit<ComponentPropsWithoutRef<"table">, "children"> & {
  columns: Array<{
    field: string;
    headerName: string;
    width?: number
  }>;
  rows: Array<Record<string, string | number>>
}

const Table: React.FC<Props> = ({ columns, rows, ...props }: Props) => {
  return (
    <table {...props}>
      <thead>
        <tr>
          {columns.map((col) => {
            return (
              <th key={col.field}>
                {col.headerName}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody>
        <tr>
          {rows.map((row) => {
            return columns.map((col) => {
              if (row[col.field]) {
                return (
                  <td key={col.field}>
                    {row[col.field]}
                  </td>
                )
              }
            })
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default Table