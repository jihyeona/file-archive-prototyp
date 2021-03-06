import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';
import { deletefile } from '../reducers/file';
import { AiOutlineFileJpg } from 'react-icons/ai';
import { FaRegFilePdf } from 'react-icons/fa';
import { FaRegFileImage } from 'react-icons/fa';
import { FaRegFileAlt } from 'react-icons/fa';

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
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => {
            if (
              rows.filter((row) => row.isSelected).length < 1 ||
              row.isSelected
            ) {
              return (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            } else {
              return (
                <div>
                  <IndeterminateCheckbox
                    checked={false}
                    readOnly
                    style={row.getToggleRowSelectedProps().style}
                  />
                </div>
              );
            }
          },
        },
        ...columns,
      ]);
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'fileExtension',
          Header: () => <div>File Type</div>,
          Cell: ({ row }) => (
            <div>
              {row.original.fileName.split('.').pop() === 'jpg' && (
                <AiOutlineFileJpg />
              )}
              {row.original.fileName.split('.').pop() === 'jpeg' && (
                <AiOutlineFileJpg />
              )}
              {row.original.fileName.split('.').pop() === 'png' && (
                <FaRegFileImage />
              )}
              {row.original.fileName.split('.').pop() === 'pdf' && (
                <FaRegFilePdf />
              )}
              {row.original.fileName.split('.').pop() === 'xml' && (
                <FaRegFileAlt />
              )}
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const selectedFileInfo = selectedFlatRows.map((d) => d.original);
  const selectedFileInfoArr = selectedFileInfo[0];
  const uploadId = selectedFileInfoArr ? selectedFileInfoArr._id : '';
  const fileUrl = selectedFileInfoArr ? selectedFileInfoArr.imageUrl : '';

  const handleDeleteClick = () => {
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
          <button type="submit" title="Upload">
            Upload
          </button>
        </Link>
        {uploadId && (
          <button title="Delete" onClick={handleDeleteClick}>
            Delete
          </button>
        )}
        {fileUrl && (
          <a href={fileUrl}>
            <button title="Download">Download</button>
          </a>
        )}
      </div>
    </>
  );
};
export default FileTable;


