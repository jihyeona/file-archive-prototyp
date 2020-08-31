import React from 'react';
import Table from 'react-bootstrap/Table';
import DataTable from 'react-data-table-component';
import { useTable } from 'react-table';

export const FileTable = ({ columns, data }) => {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Type</th>
    //       <th>File Name</th>
    //       <th>Description</th>
    //       <th>Uploaded By</th>
    //       <th>Uploaded At</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>icon</td>
    //       <a href={imageUrl}>
    //         <td>{fileName}</td>
    //       </a>
    //       <td>{description}</td>
    //       <td>{userName}</td>
    //       <td>{uploadedAt}</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
};
export default FileTable;
