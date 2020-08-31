import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';
import { Button } from 'lib/button';
import { deletefile } from '../reducers/file';
import { AiOutlineFileJpg } from 'react-icons/ai';
import { FaRegFilePdf } from 'react-icons/fa';
import { FaRegFileImage } from 'react-icons/fa';

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export const FileTable = ({ columns, data }) => {
  const dispatch = useDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'fileExtension',
          Header: () => <div>File Type</div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              {console.log(row.original.fileName.split('.').pop())}
              {row.original.fileName.split('.').pop() === 'jpg' && (
                <AiOutlineFileJpg />
              )}
              {row.original.fileName.split('.').pop() === 'png' && (
                <FaRegFileImage />
              )}
              {row.original.fileName.split('.').pop() === 'pdf' && (
                <FaRegFilePdf />
              )}
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const selectedFileInfo = selectedFlatRows.map((d) => d.original);
  const selectedFileInfoArr = selectedFileInfo[0];
  const uploadId = selectedFileInfoArr ? selectedFileInfoArr._id : '';
  const fileUrl = selectedFileInfoArr ? selectedFileInfoArr.imageUrl : '';
  console.log(selectedFileInfoArr);
  console.log(uploadId);
  console.log(fileUrl);

  const handleDeleteClick = () => {
    console.log('dispatching the deletefile thunk..');
    dispatch(deletefile(uploadId));
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sort-desc'
                        : 'sort-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <Link to={'/upload'}>
          <Button type="submit" title="Upload">
            Upload
          </Button>
        </Link>
        {uploadId && (
          <Button title="Delete" onClick={handleDeleteClick()}>
            Delete
          </Button>
        )}
        {fileUrl && (
          <a href={fileUrl}>
            <Button title="Open">Open</Button>
          </a>
        )}
      </div>
    </>
  );
};
export default FileTable;

// <pre>
//       <code>
//         {JSON.stringify(
//           {
//             selectedRowIds: selectedRowIds,
//             'selectedFlatRows[].original': selectedFlatRows.map(
//               (d) => d.original
//             ),
//           },
//           null,
//           2
//         )}
//       </code>
//     </pre>
